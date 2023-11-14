import React, { ReactElement } from "react";
import type { FC } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { userService } from "../../../services/api/user/user.service";
import { clearUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { IMenu } from "./Menu.interface";
import { MenuStyles } from "./Menu.styles";
import Dropdown from "../../dropdown/Dropdown";
import { DropdownElementStyles } from "../../dropdown/Dropdown.styles";

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
        <Link to="/events">
          <h3>Wyjazdy</h3>
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <h3>Kontact</h3>
        </Link>
      </li>
      <li>
        <h3 onClick={toggleTheme}>THEME</h3>
      </li>

      {profile?.role === "admin" && (
        <>
          <li>
            <Dropdown Label="Admin">
              <DropdownElementStyles>
                <Link to="/admin/event/create">
                  <h2>stwórz wyjazd</h2>
                </Link>
              </DropdownElementStyles>
              <DropdownElementStyles>
                <Link to="/admin/events/list">
                  <h2>lista wyjazdów</h2>
                </Link>
              </DropdownElementStyles>
            </Dropdown>
          </li>

          <li style={{ cursor: "pointer" }}>
            <IoMdLogOut className="logout" onClick={logout} />
          </li>
        </>
      )}
    </MenuStyles>
  );
};

export default Menu;
