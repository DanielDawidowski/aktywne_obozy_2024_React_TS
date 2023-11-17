import React, { ReactElement } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";

import { FaWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";

import ChatWindow from "./chat-window/ChatWindow";
import { setOpenChat } from "../../redux-toolkit/reducers/chat/chat.reducer";

import { clearUser } from "../../redux-toolkit/reducers/user/user.reducer";
import { IChat } from "../../interfaces/chat/chat.interface";
import ChatRegister from "./chat-register/ChatRegister";

const ChatBox: FC<IChat> = ({ isOpenChat }): ReactElement => {
  const { profile } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const openChat = (): void => {
    dispatch(setOpenChat({ isLoading: false, isOpenChat: true }));
    localStorage.setItem("isOpenChat", JSON.stringify(true));
  };

  const closeChat = (): void => {
    dispatch(clearUser());
    dispatch(setOpenChat({ isLoading: false, isOpenChat: false }));

    localStorage.setItem("isOpenChat", JSON.stringify(false));
  };

  return !isOpenChat ? (
    <motion.div
      className="chat"
      animate={{
        borderRadius: 100,
        height: 100,
        width: 100
      }}
      onClick={openChat}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 99999,
        cursor: "pointer",
        backgroundColor: "#fff",
        border: "10px solid #000"
      }}
    ></motion.div>
  ) : (
    <motion.div
      className="chat"
      animate={{
        borderRadius: 20,
        height: 650,
        width: 350
      }}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 99999,
        cursor: "pointer",
        backgroundColor: "#fff",
        border: "10px solid #000"
      }}
    >
      <motion.div className="chat__body">
        <div className="chat__body__header" onClick={closeChat}>
          <FaWindowClose />
        </div>
        <div className="chat__body__wrapper" style={{ display: "grid", placeItems: "center" }}>
          {!profile ? (
            <ChatRegister />
          ) : (
            <div className="chat__body__wrapper__chat">
              <ChatWindow />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

ChatBox.propTypes = {
  isOpenChat: PropTypes.bool
};

export default ChatBox;
