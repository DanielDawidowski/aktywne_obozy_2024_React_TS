import React, { ReactElement } from "react";
import type { FC } from "react";
import Layout from "../../components/layout/Layout";
import transition from "../../utils/transition";
import { HomeStyles } from "./Home.styles";

const Home: FC = (): ReactElement => {
  return (
    <Layout>
      <HomeStyles>
        <h1>siemanko</h1>
        <h2>siemanko</h2>
        <h3>siemanko</h3>
        <h4>siemanko</h4>
        <h5>siemanko</h5>
        <h6>siemanko</h6>
        <h1>
          <b>siemanko</b>
        </h1>
        <span>siemanko</span>
        <i>siemanko</i>
      </HomeStyles>
    </Layout>
  );
};

export default transition(Home);
