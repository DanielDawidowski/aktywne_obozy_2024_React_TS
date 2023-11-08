import React, { ReactElement, forwardRef, ChangeEvent, Ref } from "react";
import type { FC } from "react";
import { IInput } from "./Input.interface";

const Input: FC<IInput> = forwardRef<HTMLInputElement, IInput>(
  (
    {
      id,
      name,
      type,
      labelText,
      value,
      className,
      placeholder,
      handleChange,
      onClick,
      onFocus,
      onBlur,
      style,
      checked
    },
    ref: Ref<HTMLInputElement>
  ): ReactElement => {
    return (
      <div className="form-row">
        {labelText && (
          <label htmlFor={name} className="form-label">
            {labelText}
          </label>
        )}
        <input
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
          className={`form-input ${className}`}
          style={style}
          autoComplete="false"
          checked={checked}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
