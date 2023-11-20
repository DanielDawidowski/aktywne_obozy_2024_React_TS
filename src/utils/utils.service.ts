import { Dispatch } from "@reduxjs/toolkit";
import { addNotification, clearNotification } from "../redux-toolkit/reducers/notifications/notifications.reducer";
import { INotificationTypes } from "../interfaces/notification/notification.interface";

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
}
