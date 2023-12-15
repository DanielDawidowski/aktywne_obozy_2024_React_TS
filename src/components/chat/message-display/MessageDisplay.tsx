import React, { ReactElement } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { IChatMessage } from "../../../interfaces/chat/chat.interface";
import { IProfileProps } from "../../../interfaces/auth/auth.interface";
import useChatScrollToBottom from "../../../hooks/useChatScrollToBottom";
import { TimeAgo } from "../../../utils/timeago.utils";
import RightMessageDisplay from "./right-message/RightMessageDisplay";
import LeftMessageDisplay from "./left-message/LeftMessageDisplay";
import { MessageChatDateStyles, MessageChatStyles, MessageDisplayStyles } from "./MessageStyles";
import { Grid } from "../../globalStyles/global.styles";

interface IMessageDisplay {
  messages: IChatMessage[];
  profile: IProfileProps | null;
}

const MessageDisplay: FC<IMessageDisplay> = ({ messages, profile }): ReactElement => {
  const scrollRef = useChatScrollToBottom(messages);

  return (
    <MessageDisplayStyles ref={scrollRef}>
      {messages.map((message: IChatMessage, index: number) => (
        <MessageChatStyles key={message._id}>
          {(index === 0 || TimeAgo.dayMonthYear(message.createdAt as Date) !== TimeAgo.dayMonthYear(messages[index - 1].createdAt as Date)) && (
            <MessageChatDateStyles>
              <Grid>
                <h5>{TimeAgo?.chatMessageTransform(message?.createdAt as Date)}</h5>
              </Grid>
            </MessageChatDateStyles>
          )}

          {(message.receiverName === profile?.username.toLowerCase() || message.senderName === profile?.username.toLowerCase()) && (
            <>
              {message.senderName === profile?.username.toLowerCase() && (
                <RightMessageDisplay message={message} messages={messages} profile={profile} lastMessage={messages[messages.length - 1]} />
              )}
              {message.receiverName === profile?.username.toLowerCase() && <LeftMessageDisplay message={message} />}
            </>
          )}
        </MessageChatStyles>
      ))}
    </MessageDisplayStyles>
  );
};

MessageDisplay.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageDisplay;
