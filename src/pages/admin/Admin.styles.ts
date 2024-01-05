import styled from "styled-components";
import { InputContainer, LableStyles } from "../../components/input/Input.styles";
import { MessageDisplayStyles } from "../../components/chat/message-display/MessageStyles";
import { ChatWindowStyles } from "../../components/chat/ChatBoxStyles";

export const AdminDashboardStyles = styled.section`
  display: grid;
  grid-template-areas: "nav main";
`;

export const AdminNavStyles = styled.aside`
  grid-area: nav;
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
`;

export const AdminMainStyles = styled.main`
  grid-area: main;
`;

export const AdminEventListStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
`;

export const AdminEventListItemStyles = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${(props) => props.theme.size2};
  padding: ${(props) => props.theme.size4};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.white};
  h4 {
    color: ${(props) => props.theme.primary};
  }
`;

export const AdminWindowStyles = styled.div`
  height: 80vh;
  ${ChatWindowStyles} {
    display: grid;
    grid-template-rows: 1fr 30px;
    grid-template-areas:
      "display"
      "input";
  }
  ${MessageDisplayStyles} {
    height: 100%;
  }
`;

export const ButtonActionStyles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
  a {
    display: grid;
    place-items: center;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const ChatSettingsData = styled.div`
  margin: ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size2};
  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    margin-top: ${(props) => props.theme.size2};
  }
  h2 {
    margin: ${(props) => props.theme.size1};
  }
  h3 {
    margin: ${(props) => props.theme.size2};
    padding-bottom: ${(props) => props.theme.size2};
    border-bottom: 1px solid ${(props) => props.theme.text};
    svg {
      width: 45px;
      height: 45px;
      margin-right: ${(props) => props.theme.size2};
    }
    &:last-child() {
      border-bottom: none;
    }
  }
`;
