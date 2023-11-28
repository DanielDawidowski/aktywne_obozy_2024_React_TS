import React, { ReactElement } from "react";
import type { FC } from "react";
import Layout from "../../components/layout/Layout";
import transition from "../../utils/transition";
import { HomeEventsItemStyles, HomeEventsStyles, HomeIconsStyles, HomeStyles } from "./Home.styles";
import Carousel from "../../components/carousel/Carousel";
import Divider from "../../components/divider/Divider";
import { Link } from "react-router-dom";
import ScrollText from "../../components/scroll-text/ScrollText";
import EnergyLandiaImg from "../../assets/Images/energylandia-big.jpg";
import Home1Big from "../../assets/Images/narty-big.jpg";
import Image from "../../components/image/Image";
import { Container, TextDecoration } from "../../components/globalStyles/global.styles";
import RandomIcons from "../../components/random-icons/RandomIcons";

const Home: FC = (): ReactElement => {
  return (
    <Layout>
      <HomeStyles>
        <Carousel />
        <HomeIconsStyles>
          <Link to="/events">
            <h4>Zobacz</h4>
          </Link>
        </HomeIconsStyles>
        <Divider />
        <ScrollText />
        <Container $small>
          <HomeEventsStyles>
            <HomeEventsItemStyles>
              <Image src={EnergyLandiaImg} alt="EnergyLandia" />
              <h2>
                Każdy wyjazd w góry to cały dzień w <TextDecoration>Energylandii</TextDecoration>
              </h2>
              <Divider />
            </HomeEventsItemStyles>
            <HomeEventsItemStyles>
              <Image src={Home1Big} alt="gory" />
              <h2>
                Zima to czas <TextDecoration> na ferie</TextDecoration> w górach
              </h2>
              <Divider />
            </HomeEventsItemStyles>
          </HomeEventsStyles>
        </Container>
        <RandomIcons icons={6} flex />
      </HomeStyles>
    </Layout>
  );
};

export default transition(Home);
