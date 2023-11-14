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
import { DisplayMedia, Flex } from "../../globalStyles/global.styles";
import Accordion from "../../accordion/Accordion";
import { AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
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
            <Flex $align="center" $justify="center" $direction="row-reverse">
              <li style={{ cursor: "pointer" }}>
                <IoMdLogOut className="logout" onClick={logout} />
              </li>
              <DisplayMedia $media>
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
              </DisplayMedia>
            </Flex>
            <DisplayMedia>
              <li>
                <Accordion title="Admin">
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
                </Accordion>
              </li>
            </DisplayMedia>
          </>
        )}
      </AnimatePresence>
    </MenuStyles>
  );
};

export default Menu;
