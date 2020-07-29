import { useReducer, useMemo, useCallback } from 'react';
import last from 'lodash/last';

import { ActionType, MultiStepReducer } from './types/reducer';
import { devEnvironmentError } from './utils';
import {
  MultiStepContextType,
  MultiStepTransformedProps,
} from './types/context';

export const reducer: MultiStepReducer = (state, action) => {
  switch (action.type) {
    case ActionType.PREVIOUS_STEP:
      const stepId = last<string>(state.history);

      devEnvironmentError(
        !stepId,
        `Step "${state.stepId}" does not have previous step`
      );

      return {
        ...state,
        history: state.history.slice(0, -1),
        stepId: stepId as string,
      };
    case ActionType.JUMP_TO_STEP:
      return {
        ...state,
        history: [...state.history, state.stepId],
        stepId: action.payload,
      };
    default:
      return state;
  }
};

export const useMultiStep = (
  props: MultiStepTransformedProps
): MultiStepContextType => {
  const [state, dispatch] = useReducer<MultiStepReducer>(reducer, {
    steps: props.steps,
    history: [],
    stepId: props.stepId,
  });

  const { steps, stepId } = state;

  const step = useMemo(() => {
    const actualStep = steps.get(stepId);

    devEnvironmentError(!actualStep, `Step "${stepId}" is not found`);

    return actualStep;
  }, [steps, stepId]);

  const progress = useMemo(
    () => ({
      first: 1,
      current: Array.from(steps.keys()).indexOf(stepId) + 1,
      last: steps.size,
    }),
    [stepId, steps]
  );

  const jumpTo = useCallback(
    (id: string) => {
      dispatch({ type: ActionType.JUMP_TO_STEP, payload: id });
    },
    [dispatch]
  );

  const next = useCallback(() => {
    devEnvironmentError(
      !step?.nextStepId,
      `Step "${stepId}" does not have next step`
    );

    dispatch({
      type: ActionType.JUMP_TO_STEP,
      payload: step?.nextStepId as string,
    });
  }, [dispatch, step, stepId]);

  const previous = useCallback(() => {
    dispatch({ type: ActionType.PREVIOUS_STEP });
  }, [dispatch]);

  return {
    progress,
    step: step!,
    jumpTo,
    next,
    previous,
  };
};
