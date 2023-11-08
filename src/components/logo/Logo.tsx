import React, { ReactElement } from "react";
import type { FC } from "react";
import LogoImg from "../../assets/Images/Logo.png";
import { LogoStyles } from "./LogoStyles";

const Logo: FC = (): ReactElement => {
  return (
    <LogoStyles>
      <img src={LogoImg} alt="logo" />
    </LogoStyles>
  );
};

export default Logo;
