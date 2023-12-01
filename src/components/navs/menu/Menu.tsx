import React, { ReactElement } from "react";
import type { FC } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { userService } from "../../../services/api/user/user.service";
import { clearUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { LogoutStyles, MenuStyles, MenuThemeStyles } from "./Menu.styles";
import Dropdown from "../../dropdown/Dropdown";
import { DropdownElementStyles } from "../../dropdown/Dropdown.styles";
import { DisplayMedia, Flex } from "../../globalStyles/global.styles";
import Accordion from "../../accordion/Accordion";
import { AnimatePresence } from "framer-motion";
import SunSVG from "../../../assets/SVG/Sun";
import MoonSVG from "../../../assets/SVG/Moon";
import { toggleTheme } from "../../../redux-toolkit/reducers/theme/theme.reducer";
import { CurrentTheme } from "../../../interfaces/theme/theme.interface";

const Menu: FC = (): ReactElement => {
  const theme = useAppSelector((state) => state.theme.mode);
  const { profile } = useAppSelector((state) => state.user);

  const deleteUser = useLocalStorage<string>("user");
  const deleteToken = useLocalStorage<string>("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleThemeHandler = (): void => {
    dispatch(toggleTheme());
  };

  const logout = async (): Promise<void> => {
    await userService.logoutUser();
    dispatch(clearUser());
    deleteUser.delete();
    deleteToken.delete();
    navigate("/");
  };

  return (
    <AnimatePresence>
      <MenuStyles>
        <li className="first-element">
          {profile?.role === "admin" && (
            <Link to="/">
              <LogoutStyles>
                <IoMdLogOut className="logout" onClick={logout} />
              </LogoutStyles>
            </Link>
          )}
          <MenuThemeStyles>
            {theme === CurrentTheme.LIGHT ? (
              <motion.div
                animate={{
                  x: theme === CurrentTheme.LIGHT ? -10 : 0,
                  transition: { duration: 1 }
                }}
              >
                <MoonSVG onClick={toggleThemeHandler} />
              </motion.div>
            ) : (
              <motion.div
                animate={{
                  x: theme === CurrentTheme.DARK ? 10 : 0,
                  transition: { duration: 1 }
                }}
              >
                <SunSVG onClick={toggleThemeHandler} />
              </motion.div>
            )}
          </MenuThemeStyles>
        </li>
        <li>
          <Link to="/events">
            <h3>Wyjazdy</h3>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <h3>FAQ</h3>
          </Link>
        </li>

        {profile?.role === "admin" && (
          <>
            <Flex $align="center" $justify="center" $direction="row-reverse">
              <DisplayMedia $media>
                <li>
                  <Dropdown Label="Admin">
                    <DropdownElementStyles>
                      <Link to="/admin/event/create">
                        <h4>stwórz wyjazd</h4>
                      </Link>
                    </DropdownElementStyles>
                    <DropdownElementStyles>
                      <Link to="/admin/events/list">
                        <h4>lista wyjazdów</h4>
                      </Link>
                    </DropdownElementStyles>
                    <DropdownElementStyles>
                      <Link to="/admin/chat">
                        <h4>Chat</h4>
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
                      <h4>stwórz wyjazd</h4>
                    </Link>
                  </DropdownElementStyles>
                  <DropdownElementStyles>
                    <Link to="/admin/events/list">
                      <h4>lista wyjazdów</h4>
                    </Link>
                  </DropdownElementStyles>
                  <DropdownElementStyles>
                    <Link to="/admin/chat">
                      <h4>Chat</h4>
                    </Link>
                  </DropdownElementStyles>
                </Accordion>
              </li>
            </DisplayMedia>
          </>
        )}
      </MenuStyles>
    </AnimatePresence>
  );
};

export default Menu;
