import styled from "styled-components";
import { motion } from "framer-motion";

export const MessageDisplayStyles = styled(motion.div)`
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 495px;
  border: 1px solid ${(props) => props.theme.text};

  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    max-height: 100%;
  }

  .message-chat {
    padding: 10px;

    .message-chat-date {
      color: ${(props) => props.theme.secondary};
      font-size: 14px;
      text-align: center;
      margin-bottom: 15px;
    }
  }

  /* Webkit (Safari, Chrome) */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.thirdColor};
    border: 1px solid ${(props) => props.theme.text};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.text};
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  /* IE */
  & {
    -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  }

  &::-ms-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-ms-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

export const MessageStyles = styled(motion.div)`
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
