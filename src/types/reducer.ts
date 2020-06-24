import { MultiStepState } from './state';

export enum ActionType {
  PREVIOUS_STEP = 'PREVIOUS_STEP',
  JUMP_TO_STEP = 'JUMP_TO_STEP',
}

export type MultiStepAction =
  | {
      type: ActionType.PREVIOUS_STEP;
    }
  | { type: ActionType.JUMP_TO_STEP; payload: string };

export type MultiStepReducer = (
  state: MultiStepState,
  action: MultiStepAction
) => MultiStepState;
