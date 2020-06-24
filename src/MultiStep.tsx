import React, { useImperativeHandle } from 'react';

import { getStepId, transformStepsToMap } from './utils';
import { MultiStepProps, MultiStepTransformedProps } from './types/context';
import { MultiStepProvider } from './MultiStepContext';
import { useMultiStep } from './useMultiStep';

export const MultiStep = (props: MultiStepProps) => {
  const transformedProps: MultiStepTransformedProps = {
    ...props,
    steps: transformStepsToMap(props.steps),
    stepId: props.stepId || getStepId(props.steps, 0),
  };
  const multiStep = useMultiStep(transformedProps);
  const { children, innerRef } = props;

  useImperativeHandle(innerRef, () => multiStep);

  return (
    <MultiStepProvider value={multiStep}>
      {children?.call?.(null, multiStep)}
    </MultiStepProvider>
  );
};
