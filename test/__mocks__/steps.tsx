import React from 'react';

export const steps = [
  {
    id: 'first-step',
    Component: jest.fn(() => <p>I am a dummy component</p>),
  },
  {
    id: 'second-step',
    Component: jest.fn(() => <p>I am another dummy component</p>),
  },
  {
    id: 'jumped-step',
    Component: jest.fn(() => <p>I am a jumped step</p>),
  },
  {
    id: 'third-step',
    Component: jest.fn(() => <p>I am third dummy component</p>),
  },
];
