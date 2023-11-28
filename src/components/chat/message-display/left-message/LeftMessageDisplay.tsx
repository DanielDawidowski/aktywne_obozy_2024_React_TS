import React, { ReactElement } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { IChatMessage } from "../../../../interfaces/chat/chat.interface";
import { TimeAgo } from "../../../../utils/timeago.utils";
import { MessageLeftStyles, MessageStyles } from "../MessageStyles";

interface ILeftMessageDisplay {
  message: IChatMessage;
}

const LeftMessageDisplay: FC<ILeftMessageDisplay> = ({ message }): ReactElement => {
  return (
    <MessageStyles>
      <MessageLeftStyles>
        <h5>{message?.body}</h5>
        {/* <div className="message-time">{timeAgo.timeFormat(message?.createdAt as string)}</div> */}
      </MessageLeftStyles>
    </MessageStyles>
  );
};

LeftMessageDisplay.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    conversationId: PropTypes.string.isRequired,
    receiverId: PropTypes.string.isRequired,
    receiverName: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};
export default LeftMessageDisplay;
