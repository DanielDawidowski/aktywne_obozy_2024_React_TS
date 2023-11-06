import styled from "styled-components";
import { motion } from "framer-motion";
import ILayout from "./Layout.interface";

export const LayoutStyles = styled(motion.div)<ILayout>`
  position: relative;
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
    margin-top: 20%;
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
