import { Identifier, Step } from './context';

export type MappedStep = Step & {
  nextStepId?: Identifier;
};

export type MappedSteps = Map<string, MappedStep>;

export type MultiStepState = {
  steps: MappedSteps;
  history: string[];
  stepId: Identifier;
};
