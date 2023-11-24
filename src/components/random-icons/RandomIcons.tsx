import React, { ReactElement } from "react";
import type { FC } from "react";
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
import useEffectOnce from "../../hooks/useEffectOnce";
import { Container, Grid } from "../globalStyles/global.styles";
import { RandomIconsContainer } from "./RandomIcons.styles";
import useWindowSize from "../../hooks/useWindowSize";
import { Utils } from "../../utils/utils.service";

interface IIcon {
  id: number;
  icon: ReactElement;
}

const icons: IIcon[] = [
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

const RandomIcons: FC = (): ReactElement => {
  const size = useWindowSize();

  const randomIcons = (arr: IIcon[], iconsNum: number): ReactElement[] => {
    // Create a shallow copy of the array
    const copyArr = [...arr];

    // Shuffle the copied array
    const random = copyArr.sort(() => 0.5 - Math.random());

    // Return the subset of the shuffled array
    return random.slice(0, iconsNum).map((item: IIcon) => <Grid key={item.id}>{item.icon}</Grid>);
  };

  console.log(Utils.emitIconsAmount(size.width));

  const gridAmount = (num: number): number => {
    return num / 2;
  };

  useEffectOnce(() => {
    randomIcons(icons, Utils.emitIconsAmount(size.width));
  });

  return (
    <Container>
      <RandomIconsContainer
        style={{
          gridTemplateColumns: `repeat(${gridAmount(Utils.emitIconsAmount(size.width))}, 1fr)`,
          gridTemplateRows: `repeat(2, 1fr)`,
          gridGap: "3rem"
        }}
      >
        {randomIcons(icons, Utils.emitIconsAmount(size.width))}
      </RandomIconsContainer>
    </Container>
  );
};

export default RandomIcons;
