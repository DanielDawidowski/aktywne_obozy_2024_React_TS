import styled from "styled-components";
import { Flex } from "../../../components/globalStyles/global.styles";

export const AdminChatStyles = styled.section`
  display: flex;
  width: 100%;
  gap: 2%;

  main {
    width: 69%;
    max-height: 100%;
  }
`;

export const AdminChatListStyles = styled.aside`
  width: 29%;
`;

export const AdminChatListTitleStyles = styled.div`
  h4 {
    margin-bottom: 0.5rem;
    b {
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;

export const AdminList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const AdminListItem = styled.li<{ $active: boolean }>`
  display: grid;
  border-radius: 4px;
  border: 4px solid ${(props) => (props.$active ? props.theme.fourthColor : props.theme.secondaryColor)};
  cursor: pointer;
  margin-bottom: ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size2};
  background-color: ${(props) => (props.$active ? props.theme.fourthColor : props.theme.secondaryColor)};
  box-shadow: 1px 0 4px ${(props) => (props.$active ? props.theme.primaryColor : props.theme.text)};
  width: 100%;
  h5 {
    color: ${(props) => (props.$active ? props.theme.dark : props.theme.text)};
    letter-spacing: ${(props) => (props.$active ? "1px" : "0px")};
    font-size: ${(props) => (props.$active ? props.theme.size4 : props.theme.size3)};
  }

  h4 {
    b {
      color: ${(props) => props.theme.dark};
      font-size: ${(props) => (props.$active ? props.theme.size4 : props.theme.size3)};
    }
  }

  ${Flex} {
    width: 100%;
  }

  &:hover {
    background-color: ${(props) => props.theme.fourthColor};
    border: 2px solid ${(props) => props.theme.fourthColor};
    box-shadow:
      inset 0 0 4px ${(props) => props.theme.fourthColor},
      1px 0 4px ${(props) => props.theme.fourthColor};
  }
`;

export const AvatarStyles = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primaryColor};
  margin-right: ${(props) => props.theme.size2};
`;
