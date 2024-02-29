import { useReducer } from 'react';

export const useToggle = (defaultFlag: boolean = false) => {
  const [flag, makeToggle] = useReducer((prev) => !prev, defaultFlag);

  return [flag, makeToggle];
};
