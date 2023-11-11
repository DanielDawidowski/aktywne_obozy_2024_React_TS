import React, { useState } from "react";
import propTypes from "prop-types";
import { SelectProps } from "./Select.interface";
import { SelectButton, SelectContainer, SelectLabel, SelectMenu, SelectOption } from "./Select.styles";

const Select: React.FC<SelectProps> = ({ options, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string): void => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectLabel>{label}</SelectLabel>
      <SelectButton onClick={handleToggle}>{selectedOption || "Wybierz"}</SelectButton>
      {isOpen && (
        <SelectMenu initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {options.map((option) => (
            <SelectOption key={option} onClick={() => handleSelect(option)}>
              {option}
            </SelectOption>
          ))}
        </SelectMenu>
      )}
    </SelectContainer>
  );
};

Select.propTypes = {
  options: propTypes.array.isRequired,
  onSelect: propTypes.func.isRequired,
  label: propTypes.string.isRequired
};

export default Select;
