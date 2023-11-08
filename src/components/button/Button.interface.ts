export enum ButtonColor {
  primary = "PRIMARY",
  secondary = "SECONDARY",
  red = "RED"
}

export type ButtonTypes = ButtonColor.primary | ButtonColor.secondary | ButtonColor.red;

export default interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: ButtonTypes;
  disabled?: boolean;
}
