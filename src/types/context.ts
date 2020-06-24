import { ComponentType, ReactNode } from 'react';

import { JumpTo, Next, Previous } from './actions';
import { MappedSteps, MappedStep } from './state';

export type Identifier = string;

export type Progress = {
  first: number;
  current: number;
  last: number;
};

export type Step = {
  id: Identifier;
  Component: ComponentType;
};

export type Steps = Step[];

export type MultiStepContextType = {
  progress: Progress;
  step: MappedStep;
  jumpTo: JumpTo;
  next: Next;
  previous: Previous;
};

export type MultiStepProps = {
  steps: Steps;
  stepId?: Identifier;
  children: (bag: MultiStepContextType) => ReactNode;
  innerRef?: (instance: MultiStepContextType) => void;
};

export type MultiStepTransformedProps = Omit<MultiStepProps, 'steps'> & {
  stepId: Identifier;
  steps: MappedSteps;
};
