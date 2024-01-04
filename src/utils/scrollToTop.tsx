import React, { useEffect, FC } from "react";

const ScrollToTop: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop;
