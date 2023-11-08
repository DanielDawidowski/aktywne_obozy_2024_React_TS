import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import checkIcon from "../../../assets/SVG/check.svg";
import errorIcon from "../../../assets/SVG/error.svg";
import infoIcon from "../../../assets/SVG/info.svg";
import warningIcon from "../../../assets/SVG/warning.svg";
import {
  INotification,
  INotificationType,
  INotificationTypes
} from "../../../interfaces/notification/notification.interface";

const initialState: INotification[] = [];
const toastIcons: { [key in INotificationTypes]: { icon: string; color: string } } = {
  [INotificationType.SUCCESS]: { icon: checkIcon, color: "#5cb85c" },
  [INotificationType.ERROR]: { icon: errorIcon, color: "#d9534f" },
  [INotificationType.INFO]: { icon: infoIcon, color: "#5bc0de" },
  [INotificationType.WARNING]: { icon: warningIcon, color: "#f0ad4e" }
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<{ message: string; type: keyof typeof toastIcons }>) => {
      const { message, type } = action.payload;
      const toast = toastIcons[type];
      const toastItem: INotification = {
        id: state.length,
        description: message,
        type,
        icon: toast.icon,
        backgroundColor: toast.color
      };
      state.unshift(toastItem);
    },
    clearNotification: () => {
      return [];
    }
  }
});

export const { addNotification, clearNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
