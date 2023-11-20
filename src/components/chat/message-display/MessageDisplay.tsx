import React, { ReactElement } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { IChatMessage } from "../../../interfaces/chat/chat.interface";
import { IProfileProps } from "../../../interfaces/auth/auth.interface";
import useChatScrollToBottom from "../../../hooks/useChatScrollToBottom";
import { timeAgo } from "../../../utils/timeago.utils";
import RightMessageDisplay from "./right-message/RightMessageDisplay";
import LeftMessageDisplay from "./left-message/LeftMessageDisplay";
import { MessageDisplayStyles } from "./MessageStyles";

interface IMessageDisplay {
  messages: IChatMessage[];
  profile: IProfileProps | null;
}

const MessageDisplay: FC<IMessageDisplay> = ({ messages, profile }): ReactElement => {
  const scrollRef = useChatScrollToBottom(messages);
  return (
    <MessageDisplayStyles ref={scrollRef}>
      {messages.map((message: IChatMessage, index: number) => (
        <div key={message._id} className="message-chat">
          {(index === 0 ||
            timeAgo.dayMonthYear(message.createdAt as Date) !==
              timeAgo.dayMonthYear(messages[index - 1].createdAt as Date)) && (
            <div className="message-chat-date">{timeAgo?.chatMessageTransform(message?.createdAt as Date)}</div>
          )}

          {(message.receiverName === profile?.username.toLowerCase() ||
            message.senderName === profile?.username.toLowerCase()) && (
            <>
              {message.senderName === profile?.username.toLowerCase() && (
                <RightMessageDisplay
                  message={message}
                  messages={messages}
                  profile={profile}
                  lastMessage={messages[messages.length - 1]}
                />
              )}
              {message.receiverName === profile?.username.toLowerCase() && <LeftMessageDisplay message={message} />}
            </>
          )}
        </div>
      ))}
    </MessageDisplayStyles>
  );
};

MessageDisplay.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageDisplay;
