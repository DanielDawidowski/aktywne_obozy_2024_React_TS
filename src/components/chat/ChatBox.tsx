import React, { useState, ReactElement, useCallback, useRef } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaWindowClose, FaCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import ChatWindow from "./chat-window/ChatWindow";
import { setOpenChat } from "../../redux-toolkit/reducers/chat/chat.reducer";
import { clearUser } from "../../redux-toolkit/reducers/user/user.reducer";
import { IChat, IChatSettings } from "../../interfaces/chat/chat.interface";
import ChatRegister from "./chat-register/ChatRegister";
import { ChatBoxBigStyles, ChatBoxBodyStyles, ChatBoxHeaderConfirm, ChatBoxHeaderStyles, ChatBoxSmallStyles, ChatBoxStyles } from "./ChatBoxStyles";
import useWindowSize from "../../hooks/useWindowSize";
import { BreakPoint } from "../layout/Layout.interface";
import { Flex } from "../globalStyles/global.styles";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ISignUpData } from "../../interfaces/auth/auth.interface";
import { socketService } from "../../services/socket/socket.service";
import { chatService } from "../../services/api/chat/chat.service";
import useEffectOnce from "../../hooks/useEffectOnce";
import { ChatUtils } from "../../utils/chat-utils.service";
import axios from "axios";
import { ValidationError } from "../../interfaces/error/Error.interface";
import Spinner from "../spinner/Spinner";

const ChatBox: FC<IChat> = ({ isOpenChat }): ReactElement | null => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [settings, setSettings] = useState<IChatSettings>({} as IChatSettings);

  const { profile } = useAppSelector((state) => state.user);
  const closeRef = useRef<HTMLInputElement>(null);
  const storedUser = useLocalStorage<ISignUpData>("user");
  const user = storedUser.get() as ISignUpData;

  const size = useWindowSize();
  const dispatch = useAppDispatch();

  const currentTime = ChatUtils.getCurrentTime();
  const currentDay = ChatUtils.getCurrentDay();

  const getSettings = useCallback(async () => {
    try {
      const response = await chatService.getChatSettings();
      setSettings(response.data.chatSettings[0]);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
      } else {
        console.error(error);
      }
    }
  }, []);

  const openChat = (): void => {
    dispatch(setOpenChat({ isLoading: false, isOpenChat: true }));
  };

  const closeChat = (): void => {
    setConfirm(false);
    dispatch(setOpenChat({ isLoading: false, isOpenChat: false }));
    dispatch(clearUser());
    socketService?.socket.disconnect();
  };

  const setClose = (): void => {
    setConfirm(true);
    if (confirm) {
      closeRef?.current?.focus();
    }
  };

  useEffectOnce(() => {
    getSettings();
  });

  const isChatVisible = ChatUtils.isWithinSchedule(currentTime, currentDay, settings);

  return isChatVisible ? (
    <ChatBoxStyles>
      {!isOpenChat && !user ? (
        <ChatBoxSmallStyles
          animate={{
            borderRadius: 100,
            height: 100,
            width: 100
          }}
          onClick={openChat}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20
          }}
        >
          <IoChatboxEllipsesOutline />
        </ChatBoxSmallStyles>
      ) : (
        <ChatBoxBigStyles
          animate={{
            borderRadius: 20,
            height: size.width < BreakPoint.small ? "100%" : BreakPoint.small,
            width: size.width < BreakPoint.small ? "100%" : BreakPoint.xsmall
          }}
          style={{
            bottom: size.width < BreakPoint.xsmall ? 0 : 20,
            right: size.width < BreakPoint.xsmall ? 0 : 20
          }}
        >
          <ChatBoxHeaderStyles>
            {!confirm ? (
              <Flex $align="center" $justify="space-between">
                <span>Chat Online</span>
                <FaWindowClose onClick={setClose} />
              </Flex>
            ) : (
              <ChatBoxHeaderConfirm ref={closeRef}>
                <Flex $align="center" $justify="space-between">
                  <span>Czy chcesz zamknąć chat ?</span>
                  <Flex $align="center" $justify="space-between">
                    <FaCheck onClick={closeChat} />
                    <FaWindowClose onClick={() => setConfirm(false)} />
                  </Flex>
                </Flex>
              </ChatBoxHeaderConfirm>
            )}
          </ChatBoxHeaderStyles>
          {!loading ? <ChatBoxBodyStyles>{!profile ? <ChatRegister /> : <ChatWindow profile={profile} />}</ChatBoxBodyStyles> : <Spinner />}
        </ChatBoxBigStyles>
      )}
    </ChatBoxStyles>
  ) : null;
};

ChatBox.propTypes = {
  isOpenChat: PropTypes.bool
};

export default ChatBox;
