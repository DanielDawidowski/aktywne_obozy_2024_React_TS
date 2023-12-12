import type { ReactNode } from "react";

export interface IDrawer {
  onClose: (T: false) => void;
  position: DrawerPositions;
  children: ReactNode;
}

export enum DrawerPosition {
  left = "left",
  right = "right",
  bottom = "bottom",
  top = "top"
}

export type DrawerPositions = DrawerPosition.left | DrawerPosition.right | DrawerPosition.bottom | DrawerPosition.top;
