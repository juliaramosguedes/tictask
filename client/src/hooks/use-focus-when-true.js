import { useEffect } from 'react';

const useFocusWhenTrue = (condition, inputRef) => {
  useEffect(() => {
    if (condition && inputRef.current) {
      inputRef.current.focus();
    }
  }, [condition, inputRef]);
};

export default useFocusWhenTrue;
