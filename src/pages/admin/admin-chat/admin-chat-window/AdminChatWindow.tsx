import React, { useCallback, useEffect, useState, ReactElement } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../../redux-toolkit/hooks";
import { chatService } from "../../../../services/api/chat/chat.service";
import { IChatMessage } from "../../../../interfaces/chat/chat.interface";
import MessageDisplay from "../../../../components/chat/message-display/MessageDisplay";
import { socketService } from "../../../../services/socket/socket.service";
import { ChatUtils } from "../../../../utils/chat-utils.service";
import { AxiosResponse } from "axios";

const AdminChatWindow: FC = (): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);
  const { isLoading, selectedChatUser } = useAppSelector((state) => state.chat);
  const [message, setMessage] = useState<string>("");
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

  const handleMessage = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const messageData: IChatMessage = {
      _id: "string",
      conversationId: selectedChatUser.conversationId,
      receiverId: searchParams.get("_id") as string,
      receiverName: searchParams.get("username") as string,
      senderId: profile._id,
      senderName: profile.username,
      body: message.trim()
    };
    try {
      await chatService.saveChatMessage(messageData);
      socketService?.socket?.emit("message received", messageData);
      setMessage("");
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
    <div className="chat-window-container" data-testid="chatWindowContainer" style={{ height: "400px" }}>
      {isLoading ? (
        <div className="message-loading" data-testid="message-loading"></div>
      ) : (
        <div data-testid="chatWindow">
          <div className="chat-title" data-testid="chat-title"></div>
          <div className="chat-window">
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
                <button type="submit" disabled={!message}>
                  Send a message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChatWindow;
