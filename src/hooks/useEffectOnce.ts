import { useRef, useEffect, EffectCallback, MutableRefObject } from "react";

const useEffectOnce = (callback: EffectCallback): void => {
  const calledOnce: MutableRefObject<boolean> = useRef<boolean>(false);

  useEffect(() => {
    if (!calledOnce.current) {
      callback();
      calledOnce.current = true;
    }
  }, [callback]);
};

export default useEffectOnce;
