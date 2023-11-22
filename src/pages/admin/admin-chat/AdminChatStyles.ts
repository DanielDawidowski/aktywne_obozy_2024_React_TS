import styled from "styled-components";

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
  display: flex;
  border-radius: 4px;
  border: 2px solid ${(props) => (props.$active ? props.theme.thirdColor : props.theme.secondaryColor)};
  cursor: pointer;
  margin-bottom: ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size2};
  background-color: ${(props) => (props.$active ? props.theme.thirdColor : props.theme.secondaryColor)};
  color: ${(props) => (props.$active ? props.theme.primaryColor : props.theme.text)};

  div {
    display: grid;
    h5 {
      letter-spacing: ${(props) => (props.$active ? "1px" : "0px")};
      font-size: ${(props) => (props.$active ? props.theme.size4 : props.theme.size3)};
    }

    h4 {
      b {
        color: ${(props) => props.theme.dark};
        font-size: ${(props) => (props.$active ? props.theme.size4 : props.theme.size3)};
      }
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.fourthColor};
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
