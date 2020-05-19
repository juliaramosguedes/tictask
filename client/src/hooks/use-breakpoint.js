import React, { useState, useEffect, createContext, useContext } from 'react';
import { isNull, throttle } from 'lodash';
import { node } from 'prop-types';

const BreakpointContext = createContext(null);

const parseContent = (pseudo = ':before', selector = 'body') => {
  const el = document.querySelector(selector);
  const content = window.getComputedStyle(el, pseudo).content;

  // If no content property exists then 'normal' is returned.
  if (content && content !== '"normal"') {
    return content.replace(/^["']|["']$/g, '');
  }

  return '';
};

export const BreakpointProvider = ({ children }) => {
  const [state, setState] = useState();

  useEffect(() => {
    let mounted = true;
    let rAF = null;

    const onResize = throttle(() => {
      if (!mounted) {
        return;
      }

      if (rAF) {
        window.cancelAnimationFrame(rAF);
      }

      const breakpoint = parseContent();

      rAF = window.requestAnimationFrame(() => setState(breakpoint));
    }, 200);

    window.addEventListener('resize', onResize, {
      passive: true,
    });
    onResize();

    return () => {
      mounted = false;
      rAF = null;
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <BreakpointContext.Provider value={state}>
      {children}
    </BreakpointContext.Provider>
  );
};

BreakpointProvider.propTypes = {
  children: node.isRequired,
};

export const useBreakpoint = () => {
  const context = useContext(BreakpointContext);

  if (isNull(context)) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }

  return context;
};
