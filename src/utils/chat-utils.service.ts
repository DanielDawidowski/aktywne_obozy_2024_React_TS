import { cloneDeep, find, remove, uniqBy } from "lodash";
import type { Dispatch as ReactDispatch, SetStateAction } from "react";
import { NavigateFunction, createSearchParams } from "react-router-dom";
import type { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { IProfileProps, IUser } from "../interfaces/auth/auth.interface";
import { socketService } from "../services/socket/socket.service";
import {
  IChatMessage,
  IChatSettings,
  IChatUsers,
  IMessageData,
  INewChatUser,
  IReceiver,
  ISender,
  ISenderReceiver,
  IURLParams
} from "../interfaces/chat/chat.interface";

export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export class ChatUtils {
  static privateChatMessages: IChatMessage[] = [];
  static chatUsers: IChatUsers[] = [];

  static usersOnline(setOnlineUsers: ReactDispatch<SetStateAction<string[] | null>>): void {
    socketService?.socket?.on("user online", (data) => {
      setOnlineUsers(data);
    });
  }

  static usersOnChatPage(): void {
    socketService?.socket?.on("add chat users", (data) => {
      ChatUtils.chatUsers = [...data];
    });
  }

  static joinRoomEvent(receiver: IReceiver, sender: ISender): void {
    const users = {
      receiverId: receiver.receiverId,
      receiverName: receiver.receiverName?.toLowerCase(),
      senderId: sender.senderId,
      senderName: sender.senderName?.toLowerCase()
    };
    socketService?.socket?.emit("join room", users);
  }

  static getName(data: IChatMessage, profile: IProfileProps | null): string {
    const name =
      (data.senderName === profile?.username.toLowerCase() && data.receiverName) ||
      (data.receiverName === profile?.username.toLowerCase() && data.senderName);
    return name as string;
  }

  static getUserId(data: IChatMessage, profile: IProfileProps | null): string {
    const userId = data.senderId === profile?.authId ? data.receiverId : data.senderId;
    return userId as string;
  }

  static chatUrlParams(user: Partial<ISenderReceiver>, profile: IProfileProps | null): { username?: string; _id?: string } {
    const params: IURLParams = { username: "", _id: "" };
    if (user.receiverId === profile?.authId) {
      params.username = user.senderName?.toLowerCase();
      params._id = user.senderId;
    } else if (user.senderId === profile?.authId) {
      params.username = user.receiverName?.toLowerCase();
      params._id = user.receiverId;
    } else {
      params.username = user.receiverName?.toLowerCase();
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
    const chatConversationId = find(chatMessages, (chat) => chat.receiverId === searchParamsId || chat.senderId === searchParamsId);

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
      if (data.senderName?.toLowerCase() === username || data.receiverName.toLowerCase() === username) {
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

  static getDayIndex(day: string): number {
    return daysOfWeek.indexOf(day);
  }

  static isWithinSchedule(currentTime: string, currentDay: string, settings: IChatSettings): boolean {
    const isWithinTimeRange =
      (currentTime >= settings.startTime && currentTime <= settings.endTime) ||
      (settings.startTime > settings.endTime && (currentTime >= settings.startTime || currentTime <= settings.endTime));

    const currentDayIndex = ChatUtils.getDayIndex(currentDay);
    const startDayIndex = ChatUtils.getDayIndex(settings.startDay);
    const endDayIndex = ChatUtils.getDayIndex(settings.endDay);

    const isWithinDayRange =
      (currentDayIndex >= startDayIndex && currentDayIndex <= endDayIndex) ||
      (startDayIndex > endDayIndex && (currentDayIndex >= startDayIndex || currentDayIndex <= endDayIndex));

    return isWithinTimeRange && isWithinDayRange;
  }

  static getCurrentDay(): string {
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];

    return currentDay;
  }

  static getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  static eliminateDuplicates(objects: IChatMessage[], key: string): IChatMessage[] {
    return uniqBy(objects, key);
  }
}
