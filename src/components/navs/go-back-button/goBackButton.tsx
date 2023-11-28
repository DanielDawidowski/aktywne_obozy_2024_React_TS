import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GoBackStyles } from "./goBackButton.styles";

export const GoBackButton = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <GoBackStyles>
      <BsFillArrowLeftSquareFill style={{ fill: "#f3722c" }} onClick={() => navigate(-1)} />
    </GoBackStyles>
  );
};
