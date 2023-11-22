import React, { useCallback, useEffect, useState, ReactElement } from "react";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../../redux-toolkit/hooks";
import { chatService } from "../../../../services/api/chat/chat.service";
import { IChatMessage } from "../../../../interfaces/chat/chat.interface";
import MessageDisplay from "../../../../components/chat/message-display/MessageDisplay";
import { socketService } from "../../../../services/socket/socket.service";
import { ChatUtils } from "../../../../utils/chat-utils.service";
import { AxiosResponse } from "axios";
import { ChatWindowStyles } from "../../../../components/chat/ChatBoxStyles";
import Spinner from "../../../../components/spinner/Spinner";
import MessageInput from "../../../../components/chat/message-input/MessageInput";

const AdminChatWindow: FC = (): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);
  const { isLoading, selectedChatUser } = useAppSelector((state) => state.chat);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [rendered, setRendered] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (rendered) {
      socketService?.socket?.on("message received", (data) => {
        if (selectedChatUser && data.conversationId === selectedChatUser.conversationId) {
          ChatUtils.privateChatMessages.push(data);
          setMessages([...ChatUtils.privateChatMessages]);
        }
      });

      return () => {
        socketService?.socket?.off("message received");
      };
    }
    if (!rendered) setRendered(true);
  }, [rendered, profile?.authId, selectedChatUser]);

  const getChatMessages = useCallback(async (receiverId: string) => {
    try {
      const response: AxiosResponse = await chatService.getChatMessages(receiverId);
      ChatUtils.privateChatMessages = [...response.data.messages];
      setMessages([...ChatUtils.privateChatMessages]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getNewUserMessages = useCallback(() => {
    if (searchParams.get("_id") && searchParams.get("username")) {
      setMessages([]);
      const receiverId = searchParams.get("_id") as string;
      getChatMessages(receiverId);
    }
  }, [getChatMessages, searchParams]);

  const handleMessage = async (message: string): Promise<void> => {
    if (message.trim() === "") return;

    const messageData: IChatMessage = {
      _id: "",
      conversationId: selectedChatUser.conversationId,
      receiverId: searchParams.get("_id") as string,
      receiverName: searchParams.get("username") as string,
      senderId: profile?._id,
      senderName: profile?.username,
      body: message.trim()
    };
    try {
      await chatService.saveChatMessage(messageData);
      socketService?.socket?.emit("message received", messageData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (rendered) {
      getNewUserMessages();
    }
    if (!rendered) setRendered(true);
  }, [rendered, getNewUserMessages]);

  return (
    <ChatWindowStyles>
      {isLoading ? (
        <Spinner size={40} />
      ) : (
        <>
          <MessageDisplay messages={messages} profile={profile} />
          <MessageInput setChatMessage={handleMessage} />
        </>
      )}
    </ChatWindowStyles>
  );
};

export default AdminChatWindow;
