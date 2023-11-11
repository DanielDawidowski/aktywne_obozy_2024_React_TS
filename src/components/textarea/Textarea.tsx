// TextArea.tsx
import React from "react";
import { TextAreaProps } from "./Textarea.interface";
import { StyledTextArea, TextAreaContainer, TextAreaLabel } from "./Textarea.styles";

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <TextAreaContainer>
      <TextAreaLabel>{label}</TextAreaLabel>
      <StyledTextArea {...props} />
    </TextAreaContainer>
  );
};

export default TextArea;
