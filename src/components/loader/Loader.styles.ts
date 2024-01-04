import styled from "styled-components";
import { motion } from "framer-motion";
import { LogoStyles } from "../logo/Logo.styles";
import LoaderBG from "../../assets/Images/loader.png";

export const LoaderStyles = styled(motion.div)`
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Inner = styled.div`
  width: 30%;
  height: 50%;
  ${LogoStyles} {
    border-radius: 8px;
    padding: 8px;
    background: white;
  }
  background: white;
  padding: 40px;
  border: 1px solid black;
  box-shadow: 0 0 1px black;
  background: url(${LoaderBG});
  background-repeat: repeat;
  background-size: cover;
  background-position: top;
  border-radius: 4px;

  h3 {
    background: orangered;
    padding: 8px;
    color: white;
    border-radius: 4px;
    border: 1px solid black;
  }
`;

export const ProgressBar = styled(motion.div)`
  margin-top: 40px;
  height: 10px;
  background-color: orangered;
  border: 1px solid burlywood;
  box-shadow: 1px 1px 4px orangered;
  border-radius: 4px;
`;
