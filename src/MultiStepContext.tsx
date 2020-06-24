import { createContext } from 'react';

import { MultiStepContextType } from './types/context';

export const MultiStepContext = createContext<MultiStepContextType>(
  undefined as any
);

export const MultiStepProvider = MultiStepContext.Provider;
export const MultiStepConsumer = MultiStepContext.Consumer;
