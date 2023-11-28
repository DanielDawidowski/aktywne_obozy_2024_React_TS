import React, { ReactElement } from "react";
import type { FC } from "react";
import propTypes from "prop-types";
import { RadioGroupProps } from "./Radio.interface";
import { RadioButton, RadioContainer, RadioLabel } from "./Radio.styles";

const RadioInput: FC<RadioGroupProps> = ({ label, value, checked, onChange }): ReactElement => {
  const handleRadioChange = (): void => {
    if (!checked) {
      onChange(value);
    }
  };

  return (
    <RadioContainer>
      <RadioButton $checked={checked} whileHover={{ scale: 1.01 }}>
        <input type="radio" value={value} checked={checked} onChange={handleRadioChange} />
        <RadioLabel>{label}</RadioLabel>
      </RadioButton>
    </RadioContainer>
  );
};

RadioInput.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  checked: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired
};

export default RadioInput;
