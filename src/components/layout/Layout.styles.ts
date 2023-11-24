import styled from "styled-components";
import { ILayout } from "./Layout.interface";

export const LayoutStyles = styled.div<ILayout>`
  position: relative;
  height: 100%;
  width: 100%;
  header {
    margin-top: 0;
    ul {
      display: flex;
      li {
        margin-right: 1rem;
        list-style: none;
        a {
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 600;
        }
      }
    }
  }
  main {
  }
`;
