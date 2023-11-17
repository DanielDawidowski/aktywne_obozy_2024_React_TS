import styled from "styled-components";
import { motion } from "framer-motion";
import { IChatMessage } from "../../../interfaces/chat/chat.interface";

export const MessageDisplayStyles = styled(motion.div)`
  overflow-y: scroll;
  width: 100%;
  scroll-behavior: smooth;

  .message-chat {
    padding: 10px;

    .message-chat-date {
      color: black;
      font-size: 14px;
      text-align: center;
      margin-bottom: 15px;
    }
  }
`;

export const MessageStyles = styled(motion.div)<IChatMessage>`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
`;

export const MessageRightStyles = styled(MessageStyles)`
  justify-content: flex-end;
`;

export const MessageLeftStyles = styled(MessageStyles)`
  justify-content: flex-start;
`;
