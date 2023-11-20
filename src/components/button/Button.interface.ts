export enum ButtonColor {
  primary = "PRIMARY",
  secondary = "SECONDARY",
  auth = "AUTH",
  chat = "CHAT"
}

export type ButtonTypes = ButtonColor.primary | ButtonColor.secondary | ButtonColor.auth | ButtonColor.chat;

export default interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: ButtonTypes;
  disabled?: boolean;
}
