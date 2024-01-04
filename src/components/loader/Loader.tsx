// Preloader.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Inner, LoaderStyles, ProgressBar } from "./Loader.styles";
import { Grid } from "../globalStyles/global.styles";
import Logo from "../logo/Logo";
import useLocalStorage from "../../hooks/useLocalStorage";

interface PreloaderProps {
  setLoading: (loading: boolean) => void;
}

export interface IStoredLoader {
  shown: boolean;
}

const Loader: React.FC<PreloaderProps> = ({ setLoading }) => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const storedLoader = useLocalStorage<IStoredLoader>("loader");

  const loadContent = useCallback(async (): Promise<void> => {
    for (let i = 0; i <= 100; i += 1) {
      setLoadingProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    storedLoader.set({ shown: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <LoaderStyles>
      <Inner>
        <Grid>
          <Logo width="85px" height="125px" />
        </Grid>
        <ProgressBar
          initial={{ opacity: 1, width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          onAnimationComplete={() => setLoading(loadingProgress === 100 ? false : true)}
        ></ProgressBar>
        <Grid>
          <h3>{loadingProgress}</h3>
        </Grid>
      </Inner>
    </LoaderStyles>
  );
};

export default Loader;
