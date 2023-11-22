import styled from "styled-components";
import { motion } from "framer-motion";

export const MessageDisplayStyles = styled(motion.div)`
  overflow-y: scroll;
  scroll-behavior: smooth;

  border: 1px solid ${(props) => props.theme.text};

  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    max-height: 100%;
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

export const MessageChatStyles = styled.div`
  padding: ${(props) => props.theme.size1};
`;

export const MessageChatDateStyles = styled.div`
  padding: ${(props) => props.theme.size1};
  color: ${(props) => props.theme.secondary};
  font-size: ${(props) => props.theme.size2};
  text-align: center;
  margin-bottom: ${(props) => props.theme.size2};
`;

export const MessageStyles = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  max-width: 100%;

  h5 {
    border-radius: 16px;
    font-size: 14px;
    padding: 8px 18px;
    font-family: Oswald, sans-serif;
    letter-spacing: 1.1px;
    color: ${(props) => props.theme.text};
  }
`;

export const MessageRightStyles = styled(MessageStyles)`
  align-self: flex-end;
  max-width: 350px;
  h5 {
    text-align: right;
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

export const MessageLeftStyles = styled(MessageStyles)`
  align-self: flex-start;
  max-width: 350px;
  h5 {
    text-align: left;
    background-color: ${(props) => props.theme.secondaryColor};
  }
`;
