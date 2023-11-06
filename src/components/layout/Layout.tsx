import React, { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import ILayout from "./Layout.interface";
import { LayoutStyles } from "./LayoutStyles";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import { userService } from "../../services/api/user/user.service";
import { clearUser } from "../../redux-toolkit/reducers/user/user.reducer";
import useLocalStorage from "../../hooks/useLocalStorage";

const Layout: FC<ILayout> = ({ children, chat = true }): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);

  const deleteUser = useLocalStorage<string>("user");
  const deleteToken = useLocalStorage<string>("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    await userService.logoutUser();
    dispatch(clearUser());
    deleteUser.delete();
    deleteToken.delete();
    navigate("/");
  };

  return (
    <LayoutStyles>
      {/* {(profile?.role !== "admin" || chat) && (
        <div className="chat">
          <ChatBox isOpenChat={isOpenChat} />
        </div>
      )} */}
      <header>
        <ul>
          <li>
            <h3>
              <Link to="/">Home</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/about">About</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          </li>
          {profile?.role === "admin" && (
            <>
              <li>
                <h3>
                  <Link to="/admin">Admin</Link>
                </h3>
              </li>
              <li style={{ cursor: "pointer" }} onClick={() => console.log("Logout")}>
                <h3 onClick={logout}>Logout</h3>
              </li>
            </>
          )}
        </ul>
      </header>
      <main>{children}</main>
    </LayoutStyles>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  chat: PropTypes.bool
};

export default Layout;
