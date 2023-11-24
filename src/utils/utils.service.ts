import { Dispatch } from "@reduxjs/toolkit";
import { addNotification, clearNotification } from "../redux-toolkit/reducers/notifications/notifications.reducer";
import { INotificationTypes } from "../interfaces/notification/notification.interface";
import { IProfileProps } from "../interfaces/auth/auth.interface";
import { IChatMessage } from "../interfaces/chat/chat.interface";
import { BreakPoint } from "../components/layout/Layout.interface";

export class Utils {
  static dispatchNotification(message: string, type: INotificationTypes, dispatch: Dispatch): void {
    dispatch(addNotification({ message, type }));
  }

  static dispatchClearNotification(dispatch: Dispatch): void {
    dispatch(clearNotification());
  }

  static generateString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getStringLength(message: string, length: number): string {
    return message.slice(0, length);
  }

  static getFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  static getName(data: IChatMessage, profile: IProfileProps | null): string {
    const name =
      (data.senderName === profile?.username.toLowerCase() && data.receiverName) ||
      (data.receiverName === profile?.username.toLowerCase() && data.senderName);
    return name as string;
  }

  static emitIconsAmount(windowSize: number): number {
    switch (true) {
      case windowSize <= BreakPoint.xsmall:
        return 2;
      case windowSize <= BreakPoint.small:
        return 4;
      case windowSize <= BreakPoint.medium:
        return 6;
      case windowSize <= BreakPoint.large:
        return 8;
      case windowSize <= BreakPoint.xlarge:
        return 10;
      default:
        return 10;
    }
  }
}
