import { ReactNode } from "react";

export default interface ILayout {
  chat?: boolean;
  children: ReactNode;
}
