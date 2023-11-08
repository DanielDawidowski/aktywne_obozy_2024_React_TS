import React, { ReactElement } from "react";
import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { userService } from "../../../services/api/user/user.service";
import { clearUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { IMenu } from "./Menu.interface";
import { MenuStyles } from "./MenuStyles";

const Menu: FC<IMenu> = (props): ReactElement => {
  const { toggleTheme } = props;
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
    <MenuStyles>
      <li>
        <Link to="/">
          <h3>Home</h3>
        </Link>
      </li>
      <li>
        <Link to="/about">
          <h3>About</h3>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <h3>Login</h3>
        </Link>
      </li>
      <li>
        <h3 onClick={toggleTheme}>THEME</h3>
      </li>

      {profile?.role === "admin" && (
        <>
          <li>
            <Link to="/admin">
              <h3>Admin</h3>
            </Link>
          </li>
          <li style={{ cursor: "pointer" }} onClick={() => console.log("Logout")}>
            <h3 onClick={logout}>Logout</h3>
          </li>
        </>
      )}
    </MenuStyles>
  );
};

export default Menu;
