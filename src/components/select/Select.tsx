import React, { useState, useRef } from "react";
import propTypes from "prop-types";
import { SelectProps } from "./Select.interface";
import { SelectButton, SelectContainer, SelectLabel, SelectMenu, SelectOption } from "./Select.styles";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

const Select: React.FC<SelectProps> = ({ options, onSelect, label }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [toggleSelect, setToggleSelect] = useDetectOutsideClick(selectRef, false);

  const handleToggle = (): void => {
    setToggleSelect(!toggleSelect);
  };

  const handleSelect = (option: string): void => {
    setSelectedOption(option);
    onSelect(option);
    setToggleSelect(false);
  };

  return (
    <SelectContainer ref={selectRef}>
      <SelectLabel>{label}</SelectLabel>
      <SelectButton $red={selectedOption === "Nieaktywny"} onClick={handleToggle}>
        {selectedOption || "Wybierz"}
      </SelectButton>
      {toggleSelect && (
        <SelectMenu initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {options.map((option) => (
            <SelectOption
              whileHover={{ scale: 1.01 }}
              $red={option === "Nieaktywny"}
              key={option}
              onClick={() => handleSelect(option)}
            >
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
