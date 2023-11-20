import React, { useState, ReactElement, useEffect, useCallback } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { IoIosSend } from "react-icons/io";
import { AxiosResponse } from "axios";
import { find } from "lodash";
import { IChatMessage } from "../../../interfaces/chat/chat.interface";
import { ISignUpData } from "../../../interfaces/auth/auth.interface";
import { chatService } from "../../../services/api/chat/chat.service";
import { addUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { fetchAdminUsers } from "../../../redux-toolkit/api/admin";
import MessageDisplay from "../message-display/MessageDisplay";
import { socketService } from "../../../services/socket/socket.service";
import { ChatUtils } from "../../../utils/chat-utils.service";
import { ChatWindowHeaderStyles, ChatWindowStyles } from "../ChatBoxStyles";
import { MessageInputStyles } from "../message-input/MesageInputStyles";
import Button from "../../button/Button";
import { ButtonColor } from "../../button/Button.interface";
import Input from "../../input/Input";
import { Flex } from "../../globalStyles/global.styles";

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
      senderId: profile?._id,
      senderName: profile?.username.toLowerCase(),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rendered]);

  useEffect(() => {
    if (admin?.authId && rendered) {
      getChatMessages(admin?.authId);
    }
    if (!rendered) setRendered(true);
  }, [admin?.authId, rendered, getChatMessages]);

  return (
    <ChatWindowStyles>
      <ChatWindowHeaderStyles>
        <Flex $justify="space-between" $align="center">
          <h5>Połączono z {admin?.username}</h5>
          <h4>{profile?.username}</h4>
        </Flex>
      </ChatWindowHeaderStyles>
      <div className="chat__body__wrapper__chat__body">
        <MessageDisplay messages={messages} profile={profile} />
      </div>
      <MessageInputStyles>
        <form onSubmit={handleMessage}>
          <Input
            name="message"
            type="text"
            placeholder="Type a message"
            value={message}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          />
          <Button color={ButtonColor.chat}>
            <IoIosSend />
          </Button>
        </form>
      </MessageInputStyles>
    </ChatWindowStyles>
  );
};

export default ChatWindow;
