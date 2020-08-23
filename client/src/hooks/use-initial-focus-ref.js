import { useRef, useEffect } from 'react';

const useInitialFocusRef = (isFocusable = true) => {
  const ref = useRef();

  useEffect(() => {
    if (isFocusable && ref.current) {
      ref.current.focus();
    }
  }, [isFocusable]);

  return ref;
};

export default useInitialFocusRef;
