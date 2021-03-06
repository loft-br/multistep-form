import React, { ReactNode } from 'react';
import { fireEvent, render, act, RenderResult } from '@testing-library/react';

import { MultiStep } from '../src';
import { MultiStepContextType, Step } from '../src/types/context';
import { Container, steps } from './__mocks__';

type WrapperConfig = {
  steps: Step[];
  children: (bag: MultiStepContextType) => ReactNode;
  stepId?: string;
};

type WrapperConfigResult = {
  nextButton: HTMLElement;
  previousButton: HTMLElement;
  jumpToInput: HTMLElement;
  jumpToButton: HTMLElement;
  getInjected: () => MultiStepContextType;
} & RenderResult;

const getWrapper = ({
  steps,
  children,
  stepId,
}: WrapperConfig): WrapperConfigResult => {
  let injected: MultiStepContextType;

  const utils = render(
    <MultiStep steps={steps} stepId={stepId}>
      {bag => {
        injected = bag;
        return children(bag);
      }}
    </MultiStep>
  );

  return {
    ...utils,
    nextButton: utils.queryByText('Next')!,
    previousButton: utils.getByText('Previous'),
    jumpToInput: utils.getByPlaceholderText('Jump to step'),
    jumpToButton: utils.getByText('Jump!'),
    getInjected: () => injected,
  };
};

describe('MultiStep', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set up the component with the correct props', () => {
    const { getInjected } = getWrapper({ steps, children: Container });
    const injected = getInjected();

    expect(injected).toBeDefined();
    expect(injected.step).toMatchObject(steps[0]);
    expect(injected.next).toBeDefined();
    expect(injected.previous).toBeDefined();
    expect(injected.jumpTo).toBeDefined();
    expect(injected.progress).toEqual({
      first: 1,
      current: 1,
      last: steps.length,
    });
  });

  it('should render first step', async () => {
    const { getByText } = getWrapper({ steps, children: Container });

    expect(getByText(steps[0].id)).toBeInTheDocument();
    expect(steps[0].Component).toHaveBeenCalledTimes(1);
  });

  describe('when click on next', () => {
    let wrapper: WrapperConfigResult;
    beforeEach(async () => {
      wrapper = getWrapper({
        steps,
        children: Container,
      });

      await act(async () => {
        await fireEvent.click(wrapper.nextButton);
      });
    });

    it('should go to next step', () => {
      const { getByText } = wrapper;

      expect(getByText(steps[1].id)).toBeInTheDocument();
      expect(steps[1].Component).toHaveBeenCalledTimes(1);
    });

    it('should inject new progress', () => {
      const { getInjected } = wrapper;
      const injected = getInjected();

      expect(injected.progress).toEqual({
        first: 1,
        current: 2,
        last: steps.length,
      });
    });

    describe('and click on previous button', () => {
      it('should go back to first step', async () => {
        const { getByText, previousButton } = wrapper;

        expect(getByText(steps[1].id)).toBeInTheDocument();
        expect(steps[1].Component).toHaveBeenCalledTimes(1);

        await act(async () => {
          await fireEvent.click(previousButton);
        });

        expect(getByText(steps[0].id)).toBeInTheDocument();
        expect(steps[0].Component).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('when fill input and click on jump', () => {
    let wrapper: WrapperConfigResult;
    const step = steps[3];

    beforeEach(async () => {
      wrapper = getWrapper({
        steps,
        children: Container,
      });

      await act(async () => {
        await fireEvent.change(wrapper.jumpToInput, {
          target: { value: step.id },
        });

        await fireEvent.click(wrapper.jumpToButton);
      });
    });

    it('should go to provided step', () => {
      const { getByText } = wrapper;

      expect(getByText(step.id)).toBeInTheDocument();
      expect(step.Component).toHaveBeenCalledTimes(1);
    });

    it('should inject new progress', () => {
      const { getInjected } = wrapper;
      const injected = getInjected();

      expect(injected.progress).toEqual({
        first: 1,
        current: 4,
        last: steps.length,
      });
    });
  });

  describe('when initial step id does not exist on steps', () => {
    it('should throw an error', () => {
      spyOn(console, 'error');

      expect(() =>
        getWrapper({ steps, children: Container, stepId: 'DOES_NOT_EXIST' })
      ).toThrowError(/not found/);
    });
  });

  describe('when step does not have next step', () => {
    it('should throw an error', () => {
      const { getInjected } = getWrapper({
        steps: steps.slice(0, 1),
        children: Container,
      });
      const { next } = getInjected();

      spyOn(console, 'error');

      expect(() => act(() => next())).toThrowError(/does not have next step/);
    });
  });

  describe('when step does not have previous step', () => {
    it('should throw an error', () => {
      const { getInjected } = getWrapper({
        steps: steps.slice(0, 1),
        children: Container,
      });
      const { previous } = getInjected();

      spyOn(console, 'error');

      expect(() => act(() => previous())).toThrowError(
        /does not have previous step/
      );
    });
  });
});
