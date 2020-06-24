import React, { ChangeEvent, useCallback, useState } from 'react';

import { MultiStepContextType } from '../../src/types/context';

export const Container = ({
  step: { Component, id, nextStepId },
  progress,
  jumpTo,
  next,
  previous,
}: MultiStepContextType) => {
  const [stepId, setStepId] = useState('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setStepId(event.target.value);
  }, []);

  const handleJump = useCallback(() => {
    jumpTo(stepId);
  }, [jumpTo, stepId]);

  return (
    <>
      <h1>{id}</h1>
      <p>
        {progress.current} of {progress.last}
      </p>
      <Component />
      <button type="button" onClick={previous} id="previous">
        Previous
      </button>
      {nextStepId && (
        <button type="button" onClick={next} id="next">
          Next
        </button>
      )}
      <input type="string" placeholder="Jump to step" onChange={handleChange} />
      <button onClick={handleJump} id="jump">
        Jump!
      </button>
    </>
  );
};
