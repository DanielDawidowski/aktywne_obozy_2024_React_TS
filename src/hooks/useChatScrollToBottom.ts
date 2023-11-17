import { useEffect, useRef, MutableRefObject } from "react";

const useChatScrollToBottom = <T>(prop: T): MutableRefObject<HTMLDivElement | null> => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        (scrollRef.current.scrollHeight as number) - (scrollRef.current.clientHeight as number);
    }
  }, [prop]);

  return scrollRef;
};

export default useChatScrollToBottom;
