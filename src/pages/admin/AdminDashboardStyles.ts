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
