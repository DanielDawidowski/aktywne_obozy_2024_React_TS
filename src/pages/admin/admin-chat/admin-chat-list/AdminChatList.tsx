import React, { useEffect, useState, ReactElement } from "react";
import type { FC } from "react";
import axios from "axios";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cloneDeep, findIndex, remove } from "lodash";
import { FaWindowClose, FaCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../../redux-toolkit/hooks";
import { IChatListUser, ISenderReceiver } from "../../../../interfaces/chat/chat.interface";
import { setSelectedChatUser } from "../../../../redux-toolkit/reducers/chat/chat.reducer";
import { ChatUtils } from "../../../../utils/chat-utils.service";
import { socketService } from "../../../../services/socket/socket.service";
import { AdminChatListStyles, AdminChatListTitleStyles, AdminList, AdminListItem, AvatarStyles } from "../AdminChatStyles";
import { Utils } from "../../../../utils/utils.service";
import { Flex, Grid } from "../../../../components/globalStyles/global.styles";
import { chatService } from "../../../../services/api/chat/chat.service";
import { ValidationError } from "../../../../interfaces/error/Error.interface";
import Spinner from "../../../../components/spinner/Spinner";

const AdminChatList: FC = (): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);
  const { chatList } = useAppSelector((state) => state.chat);
  const [chatMessageList, setChatMessageList] = useState<IChatListUser[]>([] as IChatListUser[]);
  const [rendered, setRendered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<string[] | null>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (rendered) {
      socketService?.socket.on("chat list", (data: IChatListUser) => {
        if (data.senderId === profile?.authId || data.receiverId === profile?.authId) {
          const index = findIndex(chatMessageList, ["conversationId", data.conversationId]);

          let clonedChatList: IChatListUser[] = cloneDeep(chatMessageList);
          if (index > -1) {
            remove(clonedChatList, (chat) => chat.conversationId === data.conversationId);
            clonedChatList = [data, ...clonedChatList];
          } else {
            clonedChatList = [data, ...clonedChatList];
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

  const addUsernameToUrlQuery = (user: IChatListUser): void => {
    const users: Partial<ISenderReceiver> = {
      senderId: profile?.authId,
      senderName: profile?.username.toLowerCase(),
      receiverId: ChatUtils.getUserId(user, profile),
      receiverName: user.senderName === profile?.username.toLowerCase() ? user.receiverName : user.senderName
    };
    dispatch(setSelectedChatUser(user));
    const params = ChatUtils.chatUrlParams(users, profile);
    navigate(`${location.pathname}?${createSearchParams(params)}`);
  };

  const showActiveChatElement = (user: IChatListUser): boolean => {
    const paramsId = searchParams.get("_id") as string;
    return paramsId === user.senderId || paramsId === user.receiverId;
  };

  const deleteChatUser = async (data: IChatListUser): Promise<void> => {
    const isConfirmed = window.confirm("Czy napewno chcesz usunąć użytkownika chatu?");
    if (isConfirmed) {
      const userId = data.senderId === profile?.authId ? data.receiverId : data.senderId;
      try {
        await chatService.deleteChatUser(data.conversationId, userId as string);
        window.location.reload();
      } catch (error) {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
          setLoading(false);
        } else {
          console.error(error);
        }
      }
    }
  };
  useEffect(() => {
    setChatMessageList(chatList);
  }, [chatList]);

  useEffect(() => {
    ChatUtils.usersOnline(setOnlineUsers);
  }, []);

  return (
    <AdminChatListStyles>
      <AdminChatListTitleStyles>
        <h4>
          Admin: <b>{profile?.username}</b>
        </h4>
      </AdminChatListTitleStyles>

      <AdminList>
        {loading && <Spinner />}
        {chatMessageList.map((data) => (
          <AdminListItem $active={showActiveChatElement(data)} key={data._id} onClick={() => addUsernameToUrlQuery(data)}>
            <Flex $align="center" $justify="space-between">
              <AvatarStyles>{data && Utils.getFirstLetter(ChatUtils.getName(data, profile))}</AvatarStyles>
              <Flex $align="center" $justify="space-between">
                <h5>{ChatUtils.getName(data, profile)}</h5>
                <FaWindowClose onClick={() => deleteChatUser(data)} />
              </Flex>
            </Flex>
            <Flex $align="center" $justify="space-between">
              <h4>
                <b>{Utils.getStringLength(data.body, 15)}...</b>
              </h4>
              <Grid>{Utils.checkIfUserIsOnline(ChatUtils.getName(data, profile), onlineUsers) && <FaCircle style={{ fill: "limegreen" }} />}</Grid>
            </Flex>
          </AdminListItem>
        ))}
      </AdminList>
    </AdminChatListStyles>
  );
};
export default AdminChatList;
