import styled from "styled-components";
import ChatBG from "../../../assets/Images/chatBG.png";

export const MessageDisplayStyles = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  grid-area: display;
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.text};
  background: url(${ChatBG});
  background-size: cover;
  background-repeat: no-repeat;

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
  position: relative;
  font-size: ${(props) => props.theme.size2};
  margin-bottom: ${(props) => props.theme.size2};
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 25%;
    background-color: ${(props) => props.theme.dark};
    height: 1px;
    width: 50%;
    border-radius: 25%;
    z-index: -1;
  }
  h5 {
    color: ${(props) => props.theme.dark};
    background-color: ${(props) => props.theme.white};
    border-radius: 4px;
    text-align: center;
    padding: 4px ${(props) => props.theme.size1};
    border: 1px solid ${(props) => props.theme.dark};
  }
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
    font-family: BlinkMacSystemFont;
    letter-spacing: 1.1px;
    color: ${(props) => props.theme.text};
    box-shadow:
      inset 0 0 1px ${(props) => props.theme.body},
      0 1px 2px ${(props) => props.theme.dark};
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
