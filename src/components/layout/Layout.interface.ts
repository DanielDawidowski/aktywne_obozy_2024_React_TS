import { ReactNode } from "react";

export interface ILayout {
  chat?: boolean;
  children: ReactNode;
}

export enum BreakPoint {
  xsmall = 480,
  small = 680,
  medium = 960,
  large = 1440,
  xlarge = 1920
}

export type BreakPoints =
  | BreakPoint.xsmall
  | BreakPoint.small
  | BreakPoint.medium
  | BreakPoint.large
  | BreakPoint.xlarge;
