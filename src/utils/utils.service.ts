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
}
