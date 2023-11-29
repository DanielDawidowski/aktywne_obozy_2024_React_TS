import { TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
