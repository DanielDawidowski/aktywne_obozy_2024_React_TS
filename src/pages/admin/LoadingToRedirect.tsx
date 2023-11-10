import React, { useState, useEffect } from "react";
import type { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const LoadingToRedirect: FC = (): ReactElement => {
  const [count, setCount] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    // Redirect once count is equal to 0
    if (count === 0) {
      navigate("/");
    }

    // Cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <Layout>
      <p>Redirecting you in {count} seconds</p>
    </Layout>
  );
};

export default LoadingToRedirect;
