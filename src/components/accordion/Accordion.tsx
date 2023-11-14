// Install required dependencies
// npm install styled-components framer-motion

// Accordion.tsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AccordionContainer, AccordionContent, AccordionHeader, AccordionItem } from "./Accordion.styles";
import { AccordionProps } from "./Accordion.interface";

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionItem>
        <AccordionHeader onClick={toggleAccordion}>{title}</AccordionHeader>
        <AnimatePresence>
          {isOpen && (
            <AccordionContent
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </AccordionContent>
          )}
        </AnimatePresence>
      </AccordionItem>
    </AccordionContainer>
  );
};

export default Accordion;
