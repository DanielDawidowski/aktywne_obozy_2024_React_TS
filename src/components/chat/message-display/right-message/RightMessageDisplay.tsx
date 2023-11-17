import React, { ReactElement } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { ISignUpData } from "../../../../interfaces/auth/auth.interface";
import { IChatMessage } from "../../../../interfaces/chat/chat.interface";
import { timeAgo } from "../../../../utils/timeago.utils";
import { MessageRightStyles, MessageStyles } from "../MessageStyles";

// type ChatProps = Pick<IChatMessage, "senderUsername" | "createdAt">;
type ProfileProps = Pick<ISignUpData, "username">;

interface IRightMessageDisplay {
  message: IChatMessage;
  messages: IChatMessage[];
  profile: ProfileProps;
  lastMessage: IChatMessage;
}

const RightMessageDisplay: FC<IRightMessageDisplay> = ({ message, profile, lastMessage }): ReactElement => {
  return (
    <MessageStyles>
      <MessageRightStyles>
        <div data-testid="message-content" className="message-content">
          {message?.senderName === profile?.username.toLowerCase() && <h6>{message?.body}</h6>}
        </div>
        <div className="message-content-bottom">
          {lastMessage?.senderName === profile?.username.toLowerCase() && (
            <span data-testid="message-time">{timeAgo.timeFormat(message?.createdAt as string)}</span>
          )}
        </div>
      </MessageRightStyles>
    </MessageStyles>
  );
};

RightMessageDisplay.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    conversationId: PropTypes.string.isRequired,
    receiverId: PropTypes.string.isRequired,
    receiverName: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};
export default RightMessageDisplay;
