import styled from "styled-components";

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
  background-color: #fff;
  h4 {
    color: ${(props) => props.theme.primary};
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
