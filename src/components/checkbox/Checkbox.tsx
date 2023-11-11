import React, { useState } from "react";
import propTypes from "prop-types";
import { CheckboxProps } from "./Checkbox.interface";
import { CheckboxContainer, CheckboxInput, CheckboxLabel } from "./CheckboxStyles";

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange }) => {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = (): void => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" checked={isChecked} onChange={handleToggle} />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

Checkbox.propTypes = {
  label: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};

export default Checkbox;
