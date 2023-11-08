export interface INotification {
  id: number;
  description: string;
  type: INotificationTypes;
  icon: string;
  backgroundColor: string;
}

export enum INotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}

export type INotificationTypes =
  | INotificationType.SUCCESS
  | INotificationType.ERROR
  | INotificationType.INFO
  | INotificationType.WARNING;

export type IToastListItem = Pick<INotification, "icon" | "description" | "backgroundColor">;

export interface IToast {
  toastList: IToastListItem[];
  position: IToastPositions;
  autoDelete: boolean;
  autoDeleteTime?: number;
}

export enum IToastPosition {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right"
}

export type IToastPositions =
  | IToastPosition.TOP_LEFT
  | IToastPosition.TOP_RIGHT
  | IToastPosition.BOTTOM_LEFT
  | IToastPosition.BOTTOM_RIGHT;
