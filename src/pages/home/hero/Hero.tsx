import React, { useState } from "react";
import type { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import HomeImg from "../../../assets/Images/home/sebastien-goldberg-BKLHxgbYFDI-unsplash 1.png";
import TopSVG from "../../../assets/SVG/Oar2.svg";
import BottomSVG from "../../../assets/SVG/life-vest.svg";

import { BottomIcon, Face, HeroStyles, Info, Left, List, ListItem, Right, TopIcon } from "./Hero.styles";
import { Flex } from "../../../components/globalStyles/global.styles";
import FaceSVG from "../../../assets/SVG/face";

interface IElement {
  name: string;
}

const arr: IElement[] = [
  {
    name: "kolonie"
  },
  {
    name: "wycieczki"
  },
  {
    name: "spływy"
  }
];

const Hero: FC = (): ReactElement => {
  const [hover, setHover] = useState<string>("");

  return (
    <HeroStyles>
      <Left>
        <List>
          {arr.map((el: IElement, i) => (
            <ListItem key={`l-${i}`} onHoverStart={() => setHover(el.name)} onHoverEnd={() => setHover("")}>
              <motion.h2
                whileHover={{
                  scale: 1.2,
                  x: 30,
                  transition: { type: "spring", stiffness: 300, duration: 1 },
                  letterSpacing: "3px"
                }}
              >
                <b>{el.name}</b>
                {hover === el.name ? (
                  <motion.span initial={{ width: 0 }} animate={{ width: hover ? "120%" : 0, transition: { duration: 0.5 } }}></motion.span>
                ) : null}
              </motion.h2>
            </ListItem>
          ))}

          <ListItem>
            <h4>
              <b>Wybierz wakacje z nami</b>
            </h4>
          </ListItem>
        </List>
        {/* </Flex> */}
      </Left>
      <Right>
        <TopIcon initial={{ rotate: 0 }} animate={{ rotate: 30 }}>
          <img src={TopSVG} alt="home" />
        </TopIcon>
        <Info>
          <Face>
            <FaceSVG />
          </Face>
          <Flex $align="flex-start" $justify="center" $direction="column">
            <h4>ponad 1.000</h4>
            <h4>Zadowolonych dzieci</h4>
          </Flex>
        </Info>
        <img src={HomeImg} alt="home" />
        <BottomIcon>
          <img src={BottomSVG} alt="home" />
        </BottomIcon>
      </Right>
    </HeroStyles>
  );
};

export default Hero;
