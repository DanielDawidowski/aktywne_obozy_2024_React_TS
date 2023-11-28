import React, { useState, ReactElement } from "react";
import type { FC } from "react";
import { Login, Register } from "..";
import Layout from "../../../components/layout/Layout";
import Button from "../../../components/button/Button";
import { AuthContainerStyles, AuthTabsStyles, AuthTabsElementStyles, AuthInnerStyles } from "./Auth.styles";
import { ButtonColor } from "../../../components/button/Button.interface";
import transition from "../../../utils/transition";
import { Container } from "../../../components/globalStyles/global.styles";

const AuthTabs: FC = (): ReactElement => {
  const [type, setType] = useState<string>("Sign In");

  return (
    <Layout>
      <Container $small>
        <AuthContainerStyles>
          <AuthTabsStyles>
            <AuthTabsElementStyles $active={type === "Sign In"} onClick={() => setType("Sign In")}>
              <Button color={ButtonColor.secondary}>Sign In</Button>
            </AuthTabsElementStyles>
            <AuthTabsElementStyles $active={type === "Sign Up"} onClick={() => setType("Sign Up")}>
              <Button color={ButtonColor.auth}>Sign Up</Button>
            </AuthTabsElementStyles>
          </AuthTabsStyles>
          <AuthInnerStyles $signIn={type === "Sign In"}>
            {type === "Sign In" && <Login />}
            {type === "Sign Up" && <Register />}
          </AuthInnerStyles>
        </AuthContainerStyles>
      </Container>
    </Layout>
  );
};

export default transition(AuthTabs);
