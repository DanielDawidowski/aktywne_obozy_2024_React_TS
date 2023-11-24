import React, { ReactElement, forwardRef, ChangeEvent, Ref } from "react";
import type { FC } from "react";
import propTypes from "prop-types";
import { IInput } from "./Input.interface";
import { InputContainer, InputField, LableStyles } from "./Input.styles";

const Input: FC<IInput> = forwardRef<HTMLInputElement, IInput>(
  (
    { id, name, type, labelText, value, placeholder, handleChange, onClick, onFocus, onBlur, style, checked },
    ref: Ref<HTMLInputElement>
  ): ReactElement => {
    return (
      <InputContainer>
        {labelText && <LableStyles htmlFor={name}>{labelText}</LableStyles>}
        <InputField
          id={id}
          name={name}
          type={type}
          ref={ref}
          value={value}
          onChange={handleChange as (event: ChangeEvent<HTMLInputElement>) => void}
          placeholder={placeholder}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          style={style}
          autoComplete="false"
          checked={checked}
        />
      </InputContainer>
    );
  }
);

Input.propTypes = {
  id: propTypes.string,
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  labelText: propTypes.string,
  value: propTypes.string,
  placeholder: propTypes.string,
  handleChange: propTypes.func,
  onClick: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  style: propTypes.object,
  checked: propTypes.bool
};

Input.displayName = "Input";

export default Input;
