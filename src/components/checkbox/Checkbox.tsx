import React, { useState } from "react";
import propTypes from "prop-types";
import { CheckboxProps } from "./Checkbox.interface";
import { CheckIcon, CheckboxContainer, CheckboxLabel, StyledCheckbox } from "./Checkbox.styles";

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange }) => {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = (): void => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <CheckboxContainer>
      <StyledCheckbox onClick={handleToggle} $isChecked={isChecked}>
        <CheckIcon
          animate={{ opacity: isChecked ? 1 : 0, rotate: isChecked ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </StyledCheckbox>
      <CheckboxLabel $isChecked={isChecked}>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

Checkbox.propTypes = {
  label: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};

export default Checkbox;
