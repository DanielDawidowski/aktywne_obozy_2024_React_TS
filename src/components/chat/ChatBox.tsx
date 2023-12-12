import React, { useState, ReactElement, useCallback } from "react";
import type { FC } from "react";
import { AxiosResponse } from "axios";
import PropTypes from "prop-types";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import ChatWindow from "./chat-window/ChatWindow";
import { setOpenChat } from "../../redux-toolkit/reducers/chat/chat.reducer";
import { clearUser } from "../../redux-toolkit/reducers/user/user.reducer";
import { IChat, IChatSettings } from "../../interfaces/chat/chat.interface";
import ChatRegister from "./chat-register/ChatRegister";
import { ChatBoxBigStyles, ChatBoxBodyStyles, ChatBoxHeaderStyles, ChatBoxSmallStyles, ChatBoxStyles } from "./ChatBoxStyles";
import useWindowSize from "../../hooks/useWindowSize";
import { BreakPoint } from "../layout/Layout.interface";
import { Flex, Grid } from "../globalStyles/global.styles";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ISignUpData } from "../../interfaces/auth/auth.interface";
import { socketService } from "../../services/socket/socket.service";
import { chatService } from "../../services/api/chat/chat.service";
import useEffectOnce from "../../hooks/useEffectOnce";
import { ChatUtils } from "../../utils/chat-utils.service";

const ChatBox: FC<IChat> = ({ isOpenChat }): ReactElement | null => {
  const { profile } = useAppSelector((state) => state.user);
  const [settings, setSettings] = useState<IChatSettings[]>([] as IChatSettings[]);
  const storedUser = useLocalStorage<ISignUpData>("user");

  const user = storedUser.get() as ISignUpData;

  const size = useWindowSize();
  const dispatch = useAppDispatch();

  const currentTime = ChatUtils.getCurrentTime();
  const currentDay = ChatUtils.getCurrentDay();

  const getSettings = useCallback(async () => {
    try {
      const response: AxiosResponse = await chatService.getChatSettings();
      setSettings(response.data.chatSettings);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const openChat = (): void => {
    dispatch(setOpenChat({ isLoading: false, isOpenChat: true }));
  };

  const closeChat = (): void => {
    dispatch(setOpenChat({ isLoading: false, isOpenChat: false }));
    dispatch(clearUser());
    socketService?.socket.disconnect();
  };

  useEffectOnce(() => {
    getSettings();
  });

  console.log("settings", settings[0]);

  const isChatVisible = ChatUtils.isWithinSchedule(currentTime, currentDay, settings[0]);

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
            height: size.width < BreakPoint.xsmall ? "100%" : BreakPoint.small,
            width: size.width < BreakPoint.xsmall ? "100%" : BreakPoint.xsmall
          }}
          style={{
            bottom: size.width < BreakPoint.xsmall ? 0 : 20,
            right: size.width < BreakPoint.xsmall ? 0 : 20
          }}
        >
          <ChatBoxHeaderStyles>
            <Flex $align="center" $justify="space-between">
              <span>Chat Online</span>
              <FaWindowClose onClick={closeChat} />
            </Flex>
          </ChatBoxHeaderStyles>
          <ChatBoxBodyStyles>
            <Grid>{!profile ? <ChatRegister /> : <ChatWindow profile={profile} />}</Grid>
          </ChatBoxBodyStyles>
        </ChatBoxBigStyles>
      )}
    </ChatBoxStyles>
  ) : null;
};

ChatBox.propTypes = {
  isOpenChat: PropTypes.bool
};

export default ChatBox;
