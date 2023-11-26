---
title: 'Controlled and Uncontrolled components in React'
date: '2022-04-23'
tags: 'React'
shortDescription: 'What is the difference between a controlled and uncontrolled component in React?'
---

React has two different ways of control result to two types of components in React, namely, controlled and uncontrolled components. In this article, we will figure out what is the difference between them.

## Controlled components

In a controlled component, the state controls by the React component itself.
It means we update our state via events, usually connected to input field in a form.

Here’s a simple example of a controlled component:

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`input's value: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={value} onChange={handleChange} />
      <button type='submit'>Submit</button>
    </form>
  );
}
```

In the example above, we can see, that each value that will be type into our input is synchronized with our state.
Since we update our state each time when the <code>handleChange</code> function is executed.

This makes our code more predictable and allow us to control each update and do some logic if it is needed.
For example to forbid using some characters in our inputs.

## Uncontrolled components

An uncontrolled component maintains its own internal state and you need to use the <code>useRef</code> hook in order to get this element and read its current value when you need it. This approach is closer to traditional HTML.

Here's a simple example of an uncontrolled component:

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  const input = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`input's value: ${input.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' ref={input} />
      <button type='submit'>Submit</button>
    </form>
  );
}
```

As you can notice, we do not have a property value there, and we will only receive our value when the form is submitted,
so we can't control what we enter into our input.

## Which approach is better?

Honestly, I believe there is no clear approach or what is bad or good practice. I would say it entirely depends on your use case.

Controlled components have more flexibility and offer more control, as I wrote above, we can respond to each state change. Also controlled components are easy to test unlike uncontrolled ones.

Uncontrolled components are simpler and closer to the traditional way of doing UI.
For instance if you are dealing with a simple form when where immediate feedback is not necessary,
uncontrolled components might be a better choice.

React's documention recommends using controlled components to implement forms. This is because controlled components support instant field validation, allow you to conditionally disable/enable buttons, enforce input format, etc.

And I believe that's it. Good luck with your experiments 🙌
