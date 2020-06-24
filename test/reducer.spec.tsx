import React from 'react';

import { transformStepsToMap, reducer } from '../src';
import { Step } from '../src/types/context';
import { ActionType, MultiStepAction } from '../src/types/reducer';
import { MultiStepState } from '../src/types/state';

describe('useMultiStep reducer', () => {
  const steps: Step[] = [
    { id: 'first-step', Component: () => <p>blah</p> },
    { id: 'second-step', Component: () => <p>blah</p> },
    { id: 'third-step', Component: () => <p>blah</p> },
    { id: 'fourth-step', Component: () => <p>blah</p> },
    { id: 'fifth-step', Component: () => <p>blah</p> },
  ];

  describe('previous step', () => {
    const action: MultiStepAction = {
      type: ActionType.PREVIOUS_STEP,
    };

    describe('when history is not empty', () => {
      const fakeState: MultiStepState = {
        history: ['first-step', 'second-step'],
        stepId: 'third-step',
        steps: transformStepsToMap(steps),
      };

      it('should return new state correctly', () => {
        const newState = reducer(fakeState, action);

        expect(newState.history).toStrictEqual(['first-step']);
        expect(newState.stepId).toBe('second-step');
      });
    });

    describe('when history is empty', () => {
      const fakeState: MultiStepState = {
        history: [],
        stepId: 'first-step',
        steps: transformStepsToMap(steps),
      };

      it('should throw an error', () => {
        expect(() => reducer(fakeState, action)).toThrowError(
          /does not have previous step/
        );
      });
    });
  });

  describe('jump to step', () => {
    const action: MultiStepAction = {
      type: ActionType.JUMP_TO_STEP,
      payload: 'fifth-step',
    };

    const fakeState: MultiStepState = {
      history: ['first-step', 'second-step'],
      stepId: 'third-step',
      steps: transformStepsToMap(steps),
    };

    it('should return new state correctly', () => {
      const newState = reducer(fakeState, action);

      expect(newState.history).toStrictEqual([
        'first-step',
        'second-step',
        'third-step',
      ]);
      expect(newState.stepId).toBe('fifth-step');
    });
  });

  describe('another one', () => {
    const action: any = {
      type: 'MAKE_A_STEP',
      payload: 'fifth-step',
    };

    const fakeState: MultiStepState = {
      history: ['first-step', 'second-step'],
      stepId: 'third-step',
      steps: transformStepsToMap(steps),
    };

    it('should does nothing', () => {
      const newState = reducer(fakeState, action);

      expect(newState).toStrictEqual(fakeState);
    });
  });
});
