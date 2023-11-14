import styled from "styled-components";

export const AuthContainerStyles = styled.div`
  margin: ${(props) => props.theme.size2};
  padding: ${(props) => props.theme.size2};
  border: 2px solid ${(props) => props.theme.primary_light};
  background-color: ${(props) => props.theme.green};
  box-shadow: 1px 2px 8px ${(props) => props.theme.primary_light};
  border-radius: 8px;
`;

export const AuthInnerStyles = styled.div<{ $signIn: boolean }>`
  margin-top: ${(props) => props.theme.size2};
  padding: ${(props) => props.theme.size1};
  border: 2px solid ${(props) => (props.$signIn ? props.theme.secondary : props.theme.orange)};
  background-color: ${(props) => (props.$signIn ? props.theme.secondary : props.theme.orange)};
  box-shadow: 1px 2px 6px ${(props) => (props.$signIn ? props.theme.secondary : props.theme.orange)};
  border: 2px solid ${(props) => (props.$signIn ? props.theme.orange : props.theme.secondary)};
  border-radius: 4px;
`;

export const AuthTabsStyles = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
`;

export const AuthTabsElementStyles = styled.li<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.size2};
  border-radius: 4px;
  border: 2px solid ${(props) => (props.$active ? props.theme.green : props.theme.green)};
  background-color: ${(props) => (props.$active ? props.theme.green : props.theme.green)};
  transform: ${(props) => (props.$active ? "scale(1.11)" : "scale(1)")};
`;
