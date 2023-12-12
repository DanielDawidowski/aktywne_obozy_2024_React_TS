import React, { ReactElement } from "react";
import type { FC } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { userService } from "../../../services/api/user/user.service";
import { clearUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { LogoutStyles, MenuItem, MenuStyles, MenuThemeStyles } from "./Menu.styles";
import Dropdown from "../../dropdown/Dropdown";
import { DropdownElementStyles } from "../../dropdown/Dropdown.styles";
import { DisplayMedia, Flex } from "../../globalStyles/global.styles";
import Accordion from "../../accordion/Accordion";
import SunSVG from "../../../assets/SVG/Sun";
import MoonSVG from "../../../assets/SVG/Moon";
import { toggleTheme } from "../../../redux-toolkit/reducers/theme/theme.reducer";
import { CurrentTheme } from "../../../interfaces/theme/theme.interface";
import AnimatedLetters from "../../animated-letters/AnimatedLetters";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Menu: FC = (): ReactElement => {
  const theme = useAppSelector((state) => state.theme.mode);
  const { profile } = useAppSelector((state) => state.user);

  const deleteUser = useLocalStorage<string>("user");
  const deleteToken = useLocalStorage<string>("token");

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleThemeHandler = (): void => {
    dispatch(toggleTheme());
  };

  const showActiveLink = (path: string): string => {
    const lastIndex = path.lastIndexOf("/");
    if (lastIndex !== -1) {
      return path.substring(lastIndex + 1);
    }
    return path;
  };

  const logout = async (): Promise<void> => {
    await userService.logoutUser();
    dispatch(clearUser());
    deleteUser.delete();
    deleteToken.delete();
    navigate("/");
  };

  return (
    <MenuStyles variants={container} initial="hidden" animate="show">
      <MenuItem variants={item}>
        <Flex $align="center" $justify="center">
          {profile?.role === "admin" && (
            <Link to="/">
              <LogoutStyles>
                <IoMdLogOut onClick={logout} />
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
        </Flex>
      </MenuItem>
      <MenuItem variants={item} $active={showActiveLink("/events") === location.pathname.substring(1)}>
        <Link to="/events">
          <h3>
            <AnimatedLetters sentence="Wyjazdy" />
          </h3>
        </Link>
      </MenuItem>
      <MenuItem variants={item} $active={showActiveLink("/contact") === location.pathname.substring(1)}>
        <Link to="/contact">
          <h3>
            <AnimatedLetters sentence="Kontakt" />
          </h3>
        </Link>
      </MenuItem>
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
                      <h4>chat</h4>
                    </Link>
                  </DropdownElementStyles>
                  <DropdownElementStyles>
                    <Link to="/admin/settings">
                      <h4>czas chatu</h4>
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
                    <h4>chat</h4>
                  </Link>
                </DropdownElementStyles>
                <DropdownElementStyles>
                  <Link to="/admin/settings">
                    <h4>czas chatu</h4>
                  </Link>
                </DropdownElementStyles>
              </Accordion>
            </li>
          </DisplayMedia>
        </>
      )}
    </MenuStyles>
  );
};

export default Menu;
