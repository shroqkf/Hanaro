import { useState } from 'react';

export const useToggle = (defaultFlag: boolean = false) => {
  const [flag, setFlag] = useState(defaultFlag);

  const toggle = () => setFlag(!flag);

  return [flag, toggle] as const;
};
