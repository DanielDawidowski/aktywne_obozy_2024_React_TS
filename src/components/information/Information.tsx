import React, { ReactElement } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import Pin from "../../assets/SVG/Pin";
import { InformationBodyStyles, InformationIconStyles, InformationStyles } from "./Information.styles";
import { Grid } from "../globalStyles/global.styles";

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
      <InformationBodyStyles>
        <Grid>{children}</Grid>
      </InformationBodyStyles>
    </InformationStyles>
  );
};

Information.propTypes = {
  children: PropTypes.node,
  location: PropTypes.bool
};

export default Information;
