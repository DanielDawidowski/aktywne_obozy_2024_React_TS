import React, { useState, ReactElement, useEffect, useCallback } from "react";
import type { FC } from "react";
import axios from "axios";
import { find } from "lodash";
import { IChatMessage } from "../../../interfaces/chat/chat.interface";
import { OmitPasswrodLoginData } from "../../../interfaces/auth/auth.interface";
import { chatService } from "../../../services/api/chat/chat.service";
import { addUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import useLocalStorage from "../../../hooks/useLocalStorage";
import MessageDisplay from "../message-display/MessageDisplay";
import { socketService } from "../../../services/socket/socket.service";
import { ChatUtils } from "../../../utils/chat-utils.service";
import { ChatWindowHeaderStyles, ChatWindowStyles } from "../ChatBoxStyles";
import { Flex, Grid } from "../../globalStyles/global.styles";
import MessageInput from "../message-input/MessageInput";
import { ValidationError } from "../../../interfaces/error/Error.interface";
import Spinner from "../../spinner/Spinner";
import { withSocket } from "../../../utils/socketHOC";

interface IChatWidnow {
  profile: OmitPasswrodLoginData;
}

const ChatWindow: FC<IChatWidnow> = ({ profile }): ReactElement => {
  const { admin } = useAppSelector((state) => state.admin);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const getUserName = useLocalStorage<OmitPasswrodLoginData>("user");
  const [rendered, setRendered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (rendered) {
      socketService?.socket?.on("message received", (data) => {
        if (data.senderId === profile?._id || data.receiverId === profile?._id) {
          ChatUtils.privateChatMessages.push(data);
          setMessages([...ChatUtils.privateChatMessages]);
        }
      });
      return () => {
        socketService?.socket?.off("message received");
      };
    }
    if (!rendered) setRendered(true);
  }, [messages, setMessages, profile?._id, rendered]);

  useEffect(() => {
    if (!rendered) {
      const user = getUserName.get();
      socketService?.socket.emit("setup", {
        userId: user?.username
      });
    }
  }, [getUserName, rendered]);

  const getChatMessages = useCallback(async (receiverId: string) => {
    try {
      const response = await chatService.getChatMessages(receiverId);
      ChatUtils.privateChatMessages = [...response.data.messages];
      setMessages([...ChatUtils.privateChatMessages]);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
      } else {
        console.error(error);
      }
    }
  }, []);

  const chatConversationId = find(messages, (chat) => chat.receiverId === admin.authId || chat.senderId === admin.authId);

  const handleMessage = async (message: string): Promise<void> => {
    if (message.trim() === "") return;

    const messageData: IChatMessage = {
      _id: "",
      conversationId: chatConversationId ? chatConversationId.conversationId : "",
      receiverId: admin?.authId,
      receiverName: admin?.username.toLowerCase(),
      senderId: profile?._id,
      senderName: profile?.username.toLowerCase(),
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

  return loading ? (
    <Grid>
      <Spinner />
    </Grid>
  ) : (
    <ChatWindowStyles>
      <ChatWindowHeaderStyles>
        <Flex $justify="space-between" $align="center">
          <h5>Połączono z {admin?.username}</h5>
          <h4>{profile?.username}</h4>
        </Flex>
      </ChatWindowHeaderStyles>

      <MessageDisplay messages={messages} profile={profile} />
      <MessageInput setChatMessage={handleMessage} />
    </ChatWindowStyles>
  );
};

export default withSocket(ChatWindow);
