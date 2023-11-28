import React, { useEffect, FC } from "react";

const ScrollToTopOnPageChange: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTopOnPageChange;
