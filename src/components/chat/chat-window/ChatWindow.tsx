import React, { useState, ReactElement, useEffect, useCallback } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { AxiosResponse } from "axios";
import { FaWindowClose } from "react-icons/fa";
import { find } from "lodash";
import { IChatMessage } from "../../../interfaces/chat/chat.interface";
import { ISignUpData } from "../../../interfaces/auth/auth.interface";
import { chatService } from "../../../services/api/chat/chat.service";
import { addUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import { setOpenChat } from "../../../redux-toolkit/reducers/chat/chat.reducer";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { clearUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { fetchAdminUsers } from "../../../redux-toolkit/api/admin";
import MessageDisplay from "../message-display/MessageDisplay";
import { socketService } from "../../../services/socket/socket.service";
import { ChatUtils } from "../../../utils/chat-utils.service";

const ChatWindow: FC = (): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);
  const { admin } = useAppSelector((state) => state.admin);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const getUserName = useLocalStorage<ISignUpData>("user");
  const conversationId = useLocalStorage<string>("conversationId");
  const [rendered, setRendered] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socketService?.socket.on("message received", (data) => {
      if (data.senderId === profile?._id || data.receiverId === profile?._id) {
        ChatUtils.privateChatMessages.push(data);
        setMessages([...ChatUtils.privateChatMessages]);
      }
    });
    return () => {
      socketService?.socket.off("message received");
    };
  }, [messages, setMessages, profile?._id]);

  const getChatMessages = useCallback(async (receiverId: string) => {
    try {
      const response: AxiosResponse = await chatService.getChatMessages(receiverId);
      ChatUtils.privateChatMessages = [...response.data.messages];
      setMessages([...ChatUtils.privateChatMessages]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleMessage = async (e: FormEvent<HTMLFormElement>): Promise<IChatMessage | undefined> => {
    e.preventDefault();
    // socketService?.socket.emit("setup", { userId: storedUsername });
    if (message === "") return;

    const chatConversationId = find(
      messages,
      (chat) => chat.receiverId === admin.authId || chat.senderId === admin.authId
    );

    const messageData: IChatMessage = {
      _id: "string",
      conversationId: chatConversationId ? chatConversationId.conversationId : (conversationId.get() as string),
      receiverId: admin?.authId,
      receiverName: admin?.username.toLowerCase(),
      senderId: profile._id,
      senderName: profile.username.toLowerCase(),
      body: message.trim()
    };
    socketService?.socket.emit("message received", {
      message: messageData,
      to: admin?.authId
    });
    await chatService.saveChatMessage(messageData);
    setMessage("");
  };

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  useEffect(() => {
    if (getUserName && rendered) {
      const user = getUserName.get();
      if (user) {
        dispatch(addUser({ token: "", profile: user }));
      }
    }
    if (!rendered) setRendered(true);
  }, [dispatch, rendered]);

  useEffect(() => {
    if (admin?.authId && rendered) {
      getChatMessages(admin?.authId);
    }
    if (!rendered) setRendered(true);
  }, [admin?.authId, rendered, getChatMessages]);

  const closeChat = (): void => {
    dispatch(setOpenChat({ isLoading: false, isOpenChat: false }));
    dispatch(clearUser());
    localStorage.setItem("isOpenChat", JSON.stringify(false));
    conversationId.delete();
  };

  return (
    <div className="chat__body__wrapper__chat">
      <div className="chat__body__wrapper__chat__header">
        <h1>{profile?.username}</h1>
      </div>
      <div className="chat__body__wrapper__chat__body">
        <MessageDisplay messages={messages} profile={profile} />
      </div>
      <div className="chat__body__wrapper__chat__footer">
        <form onSubmit={handleMessage}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          />
          <button type="submit">Send a message</button>
        </form>
      </div>
      <div className="chat__body__header" onClick={closeChat}>
        <FaWindowClose />
      </div>
    </div>
  );
};

export default ChatWindow;
