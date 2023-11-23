import React from "react";
import type { FC, ReactElement } from "react";
import Layout from "../../components/layout/Layout";
import transition from "../../utils/transition";
import { HomeStyles } from "./Home.styles";
import Carousel from "../../components/carousel/Carousel";
import Divider from "../../components/divider/Divider";

const Home: FC = (): ReactElement => {
  return (
    <Layout>
      <HomeStyles>
        <Carousel />
        <Divider />
      </HomeStyles>
    </Layout>
  );
};

export default transition(Home);
