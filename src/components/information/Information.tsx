import React, { ReactElement } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import Pin from "../../assets/SVG/Pin";
import { InformationBodyStyles, InformationIconStyles, InformationStyles } from "./Information.styles";

interface IInformation {
  children?: ReactNode;
  location?: boolean;
}

const Information: FC<IInformation> = ({ children, location = false }): ReactElement => {
  return (
    <InformationStyles>
      {location && (
        <InformationIconStyles>
          <Pin />
        </InformationIconStyles>
      )}
      <InformationBodyStyles>{children}</InformationBodyStyles>
    </InformationStyles>
  );
};

Information.propTypes = {
  children: PropTypes.node,
  location: PropTypes.bool
};

export default Information;
