import React, { ReactElement } from "react";
import type { FC } from "react";
import { Grid } from "../../components/globalStyles/global.styles";
import Logo from "../../components/logo/Logo";

const Temp: FC = (): ReactElement => {
  return (
    <div style={{ height: "800px", width: "100vw" }}>
      <Grid>
        <Logo width="85px" height="125px" />
        <h1>Strona tymczasowo nieczynna</h1>
      </Grid>
    </div>
  );
};

export default Temp;
