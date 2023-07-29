import React from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default useIsomorphicLayoutEffect;
