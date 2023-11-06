import React, { useState, ReactElement } from "react";
import type { FC } from "react";
import { Login, Register } from "..";
import Layout from "../../../components/layout/Layout";

const AuthTabs: FC = (): ReactElement => {
  const [type, setType] = useState<string>("Sign In");

  return (
    <Layout>
      <div className="login" style={{ display: "grid", placeItems: "center" }}>
        <ul className="tab-group">
          <li className={`tab ${type === "Sign In" ? "active" : ""}`} onClick={() => setType("Sign In")}>
            <button className="login">Sign In</button>
          </li>
          <li className={`tab ${type === "Sign Up" ? "active" : ""}`} onClick={() => setType("Sign Up")}>
            <button className="signup">Sign Up</button>
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

export default AuthTabs;
