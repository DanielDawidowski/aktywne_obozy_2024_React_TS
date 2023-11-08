import React, { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import IButton, { ButtonColor } from "./Button.interface";
import { ButtonStyles } from "./ButtonStyles";

const Button: FC<IButton> = (props): ReactElement => {
  const { onClick, children, color = ButtonColor.primary, disabled } = props;

  return (
    <ButtonStyles color={color} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyles>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf([ButtonColor.primary, ButtonColor.secondary, ButtonColor.red]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

export default Button;
