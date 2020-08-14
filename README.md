[![Actions Status](https://github.com/loft-br/multistep-form/workflows/Build%20and%20Test/badge.svg)](https://github.com/loft-br/multistep-form/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b1604a3d8b002cbab16a/test_coverage)](https://codeclimate.com/github/loft-br/multistep-form/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/b1604a3d8b002cbab16a/maintainability)](https://codeclimate.com/github/loft-br/multistep-form/maintainability)
[![NPM Version](https://img.shields.io/npm/v/@loft/multistep-form.svg)](https://www.npmjs.com/package/@loft/multistep-form)
[![License](https://img.shields.io/npm/l/@loft/multistep-form)](https://opensource.org/licenses/MIT)

# Introduction

Multistep-form is an open-source lib written in **React** created by
@Loft's software engineering team to facilitate the development of a
multi-step form. It abstracts all the logic necessary for the form to
work: next, previous and skip to step **n**, in addition to facilitating
the calculation of progress.

# Installation

To have access to multistep-form, simply install using npm:

```console
npm i --save @loft/multistep-form
```

or yarn:

```console
yarn add @loft/multistep-form
```

# Usage

To make use of the facilities that the multistep-form provides, simply
use the `MultiStep` component passing the **steps** configuration and your
children will receive all the intelligence through the props:

```jsx
import { MultiStep } from '@loft/multistep-form';

<MultiStep steps={steps} stepId={stepId}>
  {Children}
</MultiStep>;
```

or

```jsx
import { MultiStep } from '@loft/multistep-form';

<MultiStep steps={steps} stepId={stepId}>
  {(props) => {
    /* Content */
  }}
</MultiStep>;
```

When using this component, a React context will be created that you can
access using the `useMultiStepContext` hook:

```jsx
import { useMultiStepContext } from '@loft/multistep-form';

const MyComponent = () => {
  const context = useMultiStepContext();

  return <Fragment>blah</Fragment>;
};
```

## Properties accepted by the MultiStep component

### Steps

The `steps` property is a list of configuration objects, it's the initial
information regarding the steps of the form, here's an example:

```javascript
const steps = [
  {
    id: 'first-step',
    Component: () => <p>I am a dummy component</p>,
  },
  {
    id: 'second-step',
    Component: () => <p>I am another dummy component</p>,
  },
  {
    id: 'jumped-step',
    Component: () => <p>I am a jumped step</p>,
  },
  {
    id: 'third-step',
    Component: () => <p>I am third dummy component</p>,
  },
];
```

As we can see in the example above, each step is composed of an id and
a component may it be functional or not.

### StepId

The `stepId` property is the identifier of the first step that will be
displayed when rendering, it's optional and if it's not provided, the identifier
of the first step of the configuration list is assumed, here is an example:

```javascript
const stepId = 'second-step';
```

## Properties injected by MultiStep into the children

### Step

The `step` property injected by the MultiStep component is the current
step the user is in, it's the following signature:

```jsx
// Container component
const Container = ({ step: { id, Component, nextStepId }, next }) => {
  return (
    <Fragment>
      <p>
        You're in step with id <span>{id}</span>
      </p>
      <Component />
      {nextStepId && <button onClick={next}>Next</button>}
    </Fragment>
  );
};

// Using provider
const MyForm = () => {
  return <Multistep steps={steps}>{Container}</Multistep>;
};
```

### Progress

The `progress` property injected by the MultiStep component is the
progress of the steps completed by the user.

```jsx
// Container component
const Container = ({
  progress: { first, current, last },
  step: { Component },
}) => {
  return (
    <Fragment>
      <p>
        You're in step <span>{current}</span>
        of the form that starts at <span>{first}</span>
        and ends at <span>{last}</span>
      </p>
      <Component />
    </Fragment>
  );
};

// Using provider
const MyForm = () => {
  return <Multistep steps={steps}>{Container}</Multistep>;
};
```

## Methods injected by MultiStep into the children

### Next

The `next` method is responsible for transitioning the step, it's linear,
that is, the user will go to the next step provided in the configuration.

```jsx
// Container component
const Container = ({ step: { Component }, next }) => {
  return (
    <Fragment>
      <Component />
      <button onClick={next}>Next</button>
    </Fragment>
  );
};

// Using provider
const MyForm = () => {
  return <Multistep steps={steps}>{Container}</Multistep>;
};
```

### Previous

The `previous` method is useful for returning to the previous step.

```jsx
// Container component
const Container = ({ step: { Component }, previous }) => {
  return (
    <Fragment>
      <Component />
      <button onClick={previous}>Previous</button>}
    </Fragment>
  );
};

// Using provider
const MyForm = () => {
  return <Multistep steps={steps}>{Container}</Multistep>;
};
```

### JumpTo

The `jumpTo` method allows you to jump directly to a step, which can
be before or after the current step.

```jsx
// Container component
const Container = ({ step: { Component }, jumpTo }) => {
  return (
    <Fragment>
      <Component />
      <button onClick={() => jumpTo('third-step')}>Jump!</button>
    </Fragment>
  );
};

// Using provider
const MyForm = () => {
  return <Multistep steps={steps}>{Container}</Multistep>;
};
```

# Examples

## TBD
