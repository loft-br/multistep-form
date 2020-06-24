import { useContext } from 'react';

import { MultiStepContext } from './MultiStepContext';
import { MultiStepContextType } from './types/context';

export const useMultiStepContext = (): MultiStepContextType => {
  const multiStep = useContext<MultiStepContextType>(MultiStepContext);

  if (__DEV__) {
    if (!multiStep) {
      console.warn(
        'Do you need call useMultiStepContext as a child of <MultiStep>'
      );
    }
  }

  return multiStep;
};
