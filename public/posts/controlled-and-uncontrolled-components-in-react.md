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
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`input's value: ${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

In the example above, we can see, that each value that will be type into our input is synchronized with our state. 
Since we update our state each time when the <code>handleChange</code> function is executed.

This makes our code more predictable and allow us to control each update and do some logic if it is needed. 
For example to forbid using some characters in our inputs.
