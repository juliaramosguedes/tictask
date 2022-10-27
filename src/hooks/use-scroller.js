import { useRef } from 'react';
import useIsInViewport from 'use-is-in-viewport';

const useScroller = ({
  isInViewportSettings = {},
  scrollIntoViewSettings = {},
}) => {
  const scrollRef = useRef(null);
  const [isInViewport, ref] = useIsInViewport({
    ...isInViewportSettings,
    target: scrollRef,
  });

  const scroller = () => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...scrollIntoViewSettings,
    });
  };

  return {
    ref,
    scroller,
    isInViewport,
    originalRef: scrollRef,
  };
};

export default useScroller;
