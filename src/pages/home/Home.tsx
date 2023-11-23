import React, { ReactElement } from "react";
import type { FC } from "react";
import Layout from "../../components/layout/Layout";
import transition from "../../utils/transition";
import { HomeIconsStyles, HomeStyles } from "./Home.styles";
import Carousel from "../../components/carousel/Carousel";
import Divider from "../../components/divider/Divider";
import { Link } from "react-router-dom";
import ScrollText from "../../components/scroll-text/ScrollText";

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
      </HomeStyles>
    </Layout>
  );
};

export default transition(Home);
