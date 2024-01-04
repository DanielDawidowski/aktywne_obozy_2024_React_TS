import React, { ReactElement } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import transition from "../../utils/transition";
import { HomeEventsItemStyles, HomeEventsStyles, HomeIconsStyles, HomeStyles } from "./Home.styles";
import Divider from "../../components/divider/Divider";
import ScrollText from "../../components/scroll-text/ScrollText";
import EnergyLandiaImg from "../../assets/Images/energylandia-big.jpg";
import Home1Big from "../../assets/Images/narty-big.jpg";
import Image from "../../components/image/Image";
import { Container, Flex, Grid, TextDecoration } from "../../components/globalStyles/global.styles";
import RandomIcons from "../../components/random-icons/RandomIcons";
import Hero from "./hero/Hero";

const Home: FC = (): ReactElement => {
  return (
    <Layout>
      <HomeStyles>
        <Container>
          <Hero />
        </Container>

        <HomeIconsStyles>
          <Link to="/events">
            <h4>Zobacz</h4>
          </Link>
        </HomeIconsStyles>
        <Divider />
        <ScrollText />
        <Divider />
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
        <Flex $align="center" $justify="center">
          <RandomIcons icons={6} flex />
        </Flex>
      </HomeStyles>
    </Layout>
  );
};

export default transition(Home);
