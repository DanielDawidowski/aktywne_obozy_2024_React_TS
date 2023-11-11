import React from "react";
import type { FC, ReactElement } from "react";
import { SpinnerProps } from "./Spinner.interface";
import { StyledSpinner } from "./Spinner.styles";

const Spinner: FC<SpinnerProps> = ({ size }): ReactElement => {
  return <StyledSpinner size={size} />;
};

export default Spinner;
