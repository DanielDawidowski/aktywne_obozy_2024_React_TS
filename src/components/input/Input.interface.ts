import { ChangeEvent, FocusEvent, MouseEvent, CSSProperties, ReactNode, Ref } from "react";

export interface IInput {
  id?: string;
  name: string;
  type: string;
  ref?: Ref<HTMLInputElement>;
  labelText?: string | ReactNode;
  value?: string;
  className?: string;
  placeholder?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  checked?: boolean;
}
