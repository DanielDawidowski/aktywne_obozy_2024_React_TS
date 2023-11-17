import { cloneDeep, find, remove, uniqBy } from "lodash";
import type { Dispatch as ReactDispatch, SetStateAction } from "react";
import { NavigateFunction, createSearchParams } from "react-router-dom";
import type { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { INewChatUser, IProfileProps, IUser } from "../interfaces/auth/auth.interface";
import { socketService } from "../services/socket/socket.service";
import {
  IChatMessage,
  IChatUsers,
  IMessageData,
  IReceiver,
  ISender,
  ISenderReceiver,
  IURLParams
} from "../interfaces/chat/chat.interface";

export class ChatUtils {
  static privateChatMessages: IChatMessage[] = [];
  static chatUsers: IChatUsers[] = [];

  static usersOnline(setOnlineUsers: ReactDispatch<SetStateAction<IChatMessage[]>>): void {
    socketService?.socket?.on("user online", (data) => {
      setOnlineUsers(data);
      console.log("data", data);
    });
  }

  static usersOnChatPage(): void {
    socketService?.socket?.on("add chat users", (data) => {
      ChatUtils.chatUsers = [...data];
    });
    console.log("ChatUtils.chatUsers", ChatUtils.chatUsers);
  }

  static joinRoomEvent(receiver: IReceiver, sender: ISender): void {
    const users = {
      receiverId: receiver.receiverId,
      receiverName: receiver.receiverName.toLowerCase(),
      senderId: sender.senderId,
      senderName: sender.senderName.toLowerCase()
    };
    socketService?.socket?.emit("join room", users);
  }

  static chatUrlParams(user: ISenderReceiver, profile: IProfileProps): { username: string; _id: string } {
    const params: IURLParams = { username: "", _id: "" };
    if (user.receiverId === profile.authId) {
      params.username = user.senderName.toLowerCase();
      params._id = user.senderId;
    } else if (user.senderId === profile.authId) {
      params.username = user.receiverName.toLowerCase();
      params._id = user.receiverId;
    } else {
      params.username = user.receiverName.toLowerCase();
      params._id = user.receiverId;
    }
    return params;
  }

  static messageData({
    receiver,
    message,
    searchParamsId,
    conversationId,
    chatMessages
  }: {
    receiver: IUser;
    message: string;
    searchParamsId: string;
    conversationId: string;
    chatMessages: IChatMessage[];
  }): IMessageData {
    const chatConversationId = find(
      chatMessages,
      (chat) => chat.receiverId === searchParamsId || chat.senderId === searchParamsId
    );

    const messageData: IMessageData = {
      conversationId: chatConversationId ? chatConversationId.conversationId : conversationId,
      receiverId: receiver._id,
      receiverName: receiver.username,
      body: message.trim()
    };
    return messageData;
  }

  static updatedSelectedChatUser({
    chatMessageList,
    setSelectedChatUser,
    params,
    pathname,
    navigate,
    dispatch
  }: {
    chatMessageList: INewChatUser[];
    setSelectedChatUser: (payload: { isLoading: boolean; user: INewChatUser | null }) => {
      type: string;
      payload: { isLoading: boolean; user: INewChatUser | null };
    };
    params: URLSearchParams;
    pathname: string;
    navigate: NavigateFunction;
    dispatch: ReduxDispatch;
  }): void {
    if (chatMessageList.length) {
      dispatch(setSelectedChatUser({ isLoading: false, user: chatMessageList[0] }));
      navigate(`${pathname}?${createSearchParams(params)}`);
    } else {
      dispatch(setSelectedChatUser({ isLoading: false, user: null }));
      // const sender = find(
      //   ChatUtils.chatUsers,
      //   (user) => user.userOne === profile?.username && user.userTwo.toLowerCase() === username
      // );
      // if (sender) {
      //   chatService.removeChatUsers(sender);
      // }
    }
  }

  static socketIOChatList(
    profile: IProfileProps,
    chatMessageList: IChatMessage[],
    setChatMessageList: ReactDispatch<SetStateAction<IChatMessage[]>>
  ): () => void {
    socketService?.socket.on("chat list", (data) => {
      if (data.senderId === profile?.authId || data.receiverId === profile?.authId) {
        const index = chatMessageList.findIndex((item) => item.conversationId === data.conversationId);
        let clonedChatList = cloneDeep(chatMessageList);
        if (index > -1) {
          remove(clonedChatList, (chat) => chat.conversationId === data.conversationId);
          clonedChatList = [data, ...clonedChatList];
        } else {
          remove(clonedChatList, (chat) => chat.receiverName === data.receiverName);
          clonedChatList = [data, ...clonedChatList];
        }
        setChatMessageList(clonedChatList);
      }
    });
    return () => {
      return socketService?.socket.off("chat list");
    };
  }

  static socketIOMessageReceived(
    chatMessages: IChatMessage[],
    username: string,
    setConversationId: ReactDispatch<SetStateAction<string>>,
    setChatMessages: ReactDispatch<SetStateAction<IChatMessage[]>>
  ): () => void {
    chatMessages = cloneDeep(chatMessages);
    socketService?.socket.on("message received", (data: IChatMessage) => {
      if (data.senderName.toLowerCase() === username || data.receiverName.toLowerCase() === username) {
        setConversationId(data.conversationId);
        ChatUtils.privateChatMessages.push(data);
        chatMessages = [...ChatUtils.privateChatMessages];
        setChatMessages(chatMessages);
      }
    });

    return () => {
      socketService?.socket.off("message received");
    };
  }

  static isCurrentTimeBetween(startHour: number, endHour: number): boolean {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Check if the current time is between the specified startHour and endHour
    if (
      (hours > startHour || (hours === startHour && minutes >= 0)) &&
      (hours < endHour || (hours === endHour && minutes <= 0))
    ) {
      return true;
    } else {
      return false;
    }
  }

  static eliminateDuplicates(objects: IChatMessage[], key: string): IChatMessage[] {
    return uniqBy(objects, key);
  }
}
