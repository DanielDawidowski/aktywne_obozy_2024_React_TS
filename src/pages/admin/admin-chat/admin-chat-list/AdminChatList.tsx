import React, { useEffect, useState, ReactElement } from "react";
import type { FC } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { cloneDeep, findIndex, remove } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../../redux-toolkit/hooks";
import { IChatMessage, IReceiver, ISender, ISenderReceiver } from "../../../../interfaces/chat/chat.interface";
import { setSelectedChatUser } from "../../../../redux-toolkit/reducers/chat/chat.reducer";
import { ChatUtils } from "../../../../utils/chat-utils.service";
import { socketService } from "../../../../services/socket/socket.service";

const AdminChatList: FC = (): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);
  const { chatList } = useAppSelector((state) => state.chat);
  const [chatMessageList, setChatMessageList] = useState<IChatMessage[]>([] as IChatMessage[]);
  const [rendered, setRendered] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (rendered) {
      socketService?.socket.on("chat list", (data: IChatMessage) => {
        if (data.senderId === profile?.authId || data.receiverId === profile?.authId) {
          const index = findIndex(chatMessageList, ["conversationId", data.conversationId]);

          let clonedChatList: IChatMessage[] = cloneDeep(chatMessageList);
          console.log("clonedChatList before", clonedChatList);
          if (index > -1) {
            remove(clonedChatList, (chat) => chat.conversationId === data.conversationId);
            clonedChatList = [data, ...clonedChatList];
            console.log("clonedChatList index > -1", clonedChatList);
          } else {
            clonedChatList = [data, ...clonedChatList];
            console.log("clonedChatList index < -1", clonedChatList);
          }
          setChatMessageList(clonedChatList);
        }
      });
      return () => {
        socketService?.socket.off("chat list");
      };
    }
    if (!rendered) setRendered(true);
  }, [profile, rendered, chatMessageList, setChatMessageList, dispatch]);

  const addUsernameToUrlQuery = async (user: IChatMessage): Promise<void> => {
    try {
      const currentAdmin: ISender = {
        senderId: profile?.authId,
        senderName: profile?.username.toLowerCase()
      };
      const currentUser: IReceiver = {
        receiverId: user.senderId === profile?.authId ? user.receiverId : user.senderId,
        receiverName: user.senderName === profile?.username.toLowerCase() ? user.receiverName : user.senderName
      };
      const users: Partial<ISenderReceiver> = {
        ...currentAdmin,
        ...currentUser
      };
      dispatch(setSelectedChatUser(user));
      const params = ChatUtils.chatUrlParams(users, profile);
      navigate(`${location.pathname}?${createSearchParams(params)}`);
      ChatUtils.joinRoomEvent(currentUser, currentAdmin);
      console.log("currentUser", currentUser);
      console.log("currentAdmin", currentAdmin);
      ChatUtils.privateChatMessages = [];
      socketService?.socket.emit("setup", {
        userId:
          (user.senderName === profile?.username.toLowerCase() && user.receiverName) ||
          (user.receiverName === profile?.username.toLowerCase() && user.senderName)
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setChatMessageList(chatList);
  }, [chatList]);

  return (
    <div data-testid="chatList">
      <div className="conversation-container">
        <div className="conversation-container-header">
          <div className="title-text">Admin: {profile?.username}</div>
        </div>

        <div className="chatList-list">
          {chatMessageList.map((data) => (
            <div
              key={data._id}
              onClick={() => addUsernameToUrlQuery(data)}
              style={{
                cursor: "pointer",
                border: "1px solid #000",
                padding: "10px"
              }}
            >
              <h5>senderName: {data.senderName}</h5>
              {/* <h6>senderID:{data.senderId}</h6> */}
              <br />
              <h5>receiverName: {data.receiverName}</h5>
              {/* <h6>receiverID:{data.receiverId}</h6> */}
              <br />
              <h6>conversationId: {data.conversationId}</h6>
              <br />
              <h4 className="font-weight-bold">message: {data.body}</h4>
            </div>
          ))}
          {/* {chatList &&
            chatList.map((data) => (
              <div
                key={Utils.generateString(10)}
                onClick={() => addUsernameToUrlQuery(data)}
                style={{
                  cursor: "pointer",
                  border: "1px solid #000",
                  padding: "10px",
                  width: "400px",
                }}
              >
                <h6>senderName: {data.senderName}</h6>
                <h6>senderID:{data.senderId}</h6>
                <br />
                <h6>receiverName: {data.receiverName}</h6>
                <h6>receiverID:{data.receiverId}</h6>
                <br />
                <h6>conversationId: {data.conversationId}</h6>
                <br />
                <h3 className="font-weight-bold">message: {data.body}</h3>
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
};
export default AdminChatList;
