import React from "react";
import type { FC, ReactElement } from "react";
import { Variants, useAnimation } from "framer-motion";
import { DrawerWrapper } from "./Drawer.styles";
import { DrawerPosition, IDrawer } from "./Drawer.interface";

const Drawer: FC<IDrawer> = ({ onClose, position, children }): ReactElement => {
  const controls = useAnimation();

  const variants: Variants = {
    open: {
      x: [DrawerPosition.left, DrawerPosition.right].includes(position) ? 0 : 0,
      y: [DrawerPosition.top, DrawerPosition.bottom].includes(position) ? 0 : 0,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    closed: {
      x: [DrawerPosition.left, DrawerPosition.right].includes(position) ? (position === DrawerPosition.left ? "-100%" : "100%") : 0,
      y: [DrawerPosition.top, DrawerPosition.bottom].includes(position) ? (position === DrawerPosition.top ? "-100%" : "100%") : 0,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <DrawerWrapper position={position} animate={controls} initial="closed" variants={variants}>
      <div>{children}</div>
    </DrawerWrapper>
  );
};

export default Drawer;
