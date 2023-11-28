import React, { ReactElement } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Bag1 from "../../assets/SVG/Icons/Bag1";
import Kayak1 from "../../assets/SVG/Icons/Kayak1";
import Kayak2 from "../../assets/SVG/Icons/Kayak2";
import Mountain1 from "../../assets/SVG/Icons/Mountain1";
import Mountain2 from "../../assets/SVG/Icons/Mountain2";
import Skies1 from "../../assets/SVG/Icons/Skies1";
import Skies2 from "../../assets/SVG/Icons/Skies2";
import Snowboard1 from "../../assets/SVG/Icons/Snowboard1";
import Snowboard2 from "../../assets/SVG/Icons/Snowboard2";
import LifeJacket from "../../assets/SVG/Icons/LifeJacket";
import { Container, Grid } from "../globalStyles/global.styles";
import { RandomIconsContainer } from "./RandomIcons.styles";

interface IRandomIcons {
  icons: number;
  grid?: boolean;
  flex?: boolean;
}

interface IIcon {
  id: number;
  icon: ReactElement;
}

const iconsSVG: IIcon[] = [
  {
    id: 0,
    icon: <Bag1 />
  },
  {
    id: 1,
    icon: <Kayak1 />
  },
  {
    id: 2,
    icon: <Kayak2 />
  },
  {
    id: 3,
    icon: <Mountain1 />
  },
  {
    id: 4,
    icon: <Mountain2 />
  },
  {
    id: 5,
    icon: <Skies1 />
  },
  {
    id: 6,
    icon: <Skies2 />
  },
  {
    id: 7,
    icon: <Snowboard1 />
  },
  {
    id: 8,
    icon: <Snowboard2 />
  },
  {
    id: 9,
    icon: <LifeJacket />
  }
];

const RandomIcons: FC<IRandomIcons> = (props): ReactElement => {
  const { icons, flex = false, grid = false } = props;

  const randomIcons = (arr: IIcon[], iconsNum: number): ReactElement[] => {
    // Create a shallow copy of the array
    const copyArr = [...arr];

    // Shuffle the copied array
    const random = copyArr.sort(() => 0.5 - Math.random());

    // Return the subset of the shuffled array
    return random.slice(0, iconsNum).map((item: IIcon) => (
      <motion.li key={item.id}>
        <Grid>{item.icon}</Grid>
      </motion.li>
    ));
  };

  return (
    <Container>
      <RandomIconsContainer $flex={flex} $grid={grid}>
        {randomIcons(iconsSVG, icons)}
      </RandomIconsContainer>
    </Container>
  );
};

RandomIcons.propTypes = {
  icons: PropTypes.number.isRequired,
  grid: PropTypes.bool,
  flex: PropTypes.bool
};

export default RandomIcons;
