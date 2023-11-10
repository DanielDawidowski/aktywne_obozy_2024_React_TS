import React, { ReactElement } from "react";
import type { FC } from "react";
import Layout from "../../components/layout/Layout";
import transition from "../../utils/transition";

const Home: FC = (): ReactElement => {
  return <Layout>Home</Layout>;
};

export default transition(Home);
