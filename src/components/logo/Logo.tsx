import React, { ReactElement } from "react";
import propTypes from "prop-types";
import type { FC } from "react";
import LogoImg from "../../assets/Images/Logo.png";
import { LogoStyles } from "./Logo.styles";

interface ILogo {
  width: string;
  height: string;
}

const Logo: FC<ILogo> = (props): ReactElement => {
  const { width, height } = props;
  return (
    <LogoStyles>
      <img
        src={LogoImg}
        alt="logo"
        style={{
          width,
          height
        }}
      />
    </LogoStyles>
  );
};

Logo.propTypes = {
  width: propTypes.string.isRequired,
  height: propTypes.string.isRequired
};

export default Logo;
