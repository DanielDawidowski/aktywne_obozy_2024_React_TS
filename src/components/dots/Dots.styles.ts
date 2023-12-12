import styled from "styled-components";

export const DotsContainer = styled.div<{ $rows: number; $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  grid-gap: 6px;
`;

export const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.fourthColor};
  border: 1px solid ${(props) => props.theme.fourthColor};
`;
