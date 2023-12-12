import React, { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { DropdownButton, DropdownContainer, DropdownContent } from "./Dropdown.styles";
import { DropdownProps } from "./Dropdown.interface";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

// Reusable Dropdown Component
const Dropdown: React.FC<DropdownProps> = ({ Label, children }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggleDropdown, setToggleDropdown] = useDetectOutsideClick(dropdownRef, false);

  const setDropdown = (): void => {
    setToggleDropdown(!toggleDropdown);
  };

  return (
    <DropdownContainer ref={dropdownRef} onClick={() => setToggleDropdown(true)}>
      <DropdownButton $active={toggleDropdown === true} onClick={setDropdown}>
        {Label}
      </DropdownButton>
      <AnimatePresence>
        {toggleDropdown && (
          <DropdownContent
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </DropdownContent>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
};

export default Dropdown;
