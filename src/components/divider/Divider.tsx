import React, { ReactElement } from "react";
import type { FC } from "react";
import { DividerCenterStyles, DividerLeftStyles, DividerRightStyles, DividerStyles } from "./Divider.styles";

const Divider: FC = (): ReactElement => {
  return (
    <DividerStyles>
      <DividerLeftStyles>
        <span></span>
      </DividerLeftStyles>
      <DividerCenterStyles>
        <span></span>
      </DividerCenterStyles>
      <DividerRightStyles>
        <span></span>
      </DividerRightStyles>
    </DividerStyles>
  );
};

export default Divider;
