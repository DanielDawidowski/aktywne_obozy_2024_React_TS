import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

export const GoBackButton = (): ReactElement => {
  const navigate = useNavigate();

  return <BsFillArrowLeftSquareFill style={{ fill: "#f3722c" }} onClick={() => navigate(-1)} />;
};
