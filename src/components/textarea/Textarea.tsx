// TextArea.tsx
import React from "react";
import { TextAreaProps } from "./Textarea.interface";
import { StyledTextArea, TextAreaContainer, TextAreaLabel } from "./Textarea.styles";

const TextArea: React.FC<TextAreaProps> = ({ label, onChange, ...props }) => {
  return (
    <TextAreaContainer>
      <TextAreaLabel>{label}</TextAreaLabel>
      <StyledTextArea {...props} onChange={onChange} />
    </TextAreaContainer>
  );
};

export default TextArea;
