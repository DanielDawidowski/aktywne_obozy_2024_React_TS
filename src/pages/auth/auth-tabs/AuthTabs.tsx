import React, { useState, ReactElement } from "react";
import type { FC } from "react";
import { Login, Register } from "..";
import Layout from "../../../components/layout/Layout";
import transition from "../../../utils/transition";
import Button from "../../../components/button/Button";

const AuthTabs: FC = (): ReactElement => {
  const [type, setType] = useState<string>("Sign In");

  return (
    <Layout>
      <div className="login" style={{ display: "grid", placeItems: "center" }}>
        <ul className="tab-group">
          <li className={`tab ${type === "Sign In" ? "active" : ""}`} onClick={() => setType("Sign In")}>
            <Button className="login">Sign In</Button>
          </li>
          <li className={`tab ${type === "Sign Up" ? "active" : ""}`} onClick={() => setType("Sign Up")}>
            <Button className="signup">Sign Up</Button>
          </li>
        </ul>
        {type === "Sign In" && (
          <div className="tab-item">
            <div className="tab-item">
              <Login />
            </div>
          </div>
        )}
        {type === "Sign Up" && (
          <div className="tab-item">
            <div className="tab-item">
              <Register />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default transition(AuthTabs);
