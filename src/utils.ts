import { MappedSteps } from './types/state';
import { Steps } from './types/context';

export const getStepId = (steps: Steps, index: number) => {
  const outOfBoundaries = index < 0 || index > steps.length - 1;

  if (outOfBoundaries) {
    return '';
  }

  return steps[index].id;
};

export const transformStepsToMap = (steps: Steps): MappedSteps =>
  new Map(
    steps.map(({ id, ...step }, index) => [
      id,
      {
        ...step,
        id,
        nextStepId: getStepId(steps, index + 1),
      },
    ])
  );

export const devEnvironmentError = (condition: boolean, message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      throw new Error(message);
    }
  }
};
