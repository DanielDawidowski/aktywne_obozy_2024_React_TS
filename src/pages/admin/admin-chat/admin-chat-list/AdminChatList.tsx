import React, { useEffect, useState, ReactElement } from "react";
import type { FC } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cloneDeep, findIndex, remove } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../../redux-toolkit/hooks";
import { IChatMessage, IReceiver, ISender, ISenderReceiver } from "../../../../interfaces/chat/chat.interface";
import { setSelectedChatUser } from "../../../../redux-toolkit/reducers/chat/chat.reducer";
import { ChatUtils } from "../../../../utils/chat-utils.service";
import { socketService } from "../../../../services/socket/socket.service";
import {
  AdminChatListStyles,
  AdminChatListTitleStyles,
  AdminList,
  AdminListItem,
  AvatarStyles
} from "../AdminChatStyles";
import { Utils } from "../../../../utils/utils.service";

const AdminChatList: FC = (): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);
  const { chatList } = useAppSelector((state) => state.chat);
  const [chatMessageList, setChatMessageList] = useState<IChatMessage[]>([] as IChatMessage[]);
  const [rendered, setRendered] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (rendered) {
      socketService?.socket.on("chat list", (data: IChatMessage) => {
        if (data.senderId === profile?.authId || data.receiverId === profile?.authId) {
          const index = findIndex(chatMessageList, ["conversationId", data.conversationId]);

          let clonedChatList: IChatMessage[] = cloneDeep(chatMessageList);
          // console.log("clonedChatList before", clonedChatList);
          if (index > -1) {
            remove(clonedChatList, (chat) => chat.conversationId === data.conversationId);
            clonedChatList = [data, ...clonedChatList];
            // console.log("clonedChatList index > -1", clonedChatList);
          } else {
            clonedChatList = [data, ...clonedChatList];
            // console.log("clonedChatList index < -1", clonedChatList);
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

  const showActiveChatElement = (user: IChatMessage): boolean => {
    const paramsId = searchParams.get("_id") as string;

    return paramsId === user.senderId || paramsId === user.receiverId;
  };

  useEffect(() => {
    setChatMessageList(chatList);
  }, [chatList]);

  return (
    <AdminChatListStyles>
      <AdminChatListTitleStyles>
        <h4>
          Admin: <b>{profile?.username}</b>
        </h4>
      </AdminChatListTitleStyles>

      <AdminList>
        {chatMessageList.map((data) => (
          <AdminListItem
            $active={showActiveChatElement(data)}
            key={data._id}
            onClick={() => addUsernameToUrlQuery(data)}
          >
            <AvatarStyles>{data && Utils.getFirstLetter(Utils.getName(data, profile))}</AvatarStyles>
            <div>
              <h5>{Utils.getName(data, profile)}</h5>
              <h4>
                <b>{Utils.getStringLength(data.body, 15)}...</b>
              </h4>
            </div>
          </AdminListItem>
        ))}
      </AdminList>
    </AdminChatListStyles>
  );
};
export default AdminChatList;
