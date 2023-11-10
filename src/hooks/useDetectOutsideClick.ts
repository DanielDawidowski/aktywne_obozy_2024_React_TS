import { useEffect, useState, RefObject } from "react";

const useDetectOutsideClick = (
  ref: RefObject<HTMLElement>,
  initialState: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (event: MouseEvent): void => {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("mousedown", onClick);
    }

    return () => {
      window.removeEventListener("mousedown", onClick);
    };
  }, [isActive, ref]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
