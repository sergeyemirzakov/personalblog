---
title: 'ComponentProps or getting component props types in React'
date: '2023-07-31'
tags: 'React_Typescript'
shortDescription: 'When you want to use default props of HTML element with custom ones.'
---

When you are a frontend developer you need to create some UI components really often. And despite of custom props for your components you want to use their default props.

For example if we are talking about <code>Button</code> component then you can expect that this component contains such props as <code>disabled</code>, <code>type</code>, <code>form</code> and so on. And in order to get it <code>ComponentProps</code> comes to the rescue.

Let's create a simple <code>Button</code> component without <code>ComponentProps</code> and see what happens to better understand it:

```tsx
import React, { ComponentProps } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return <button className={styles.root}>{children}</button>;
};

export default Button;
```

I know, it's a very simple component but it will be enough for us in order to understand. Let's try to import it somewhere and to use default <code>disabled</code> prop:

![type error](/images/component-props-reacts-most-useful-type-helper-type-error.jpg)

Yes, a type error. Because we didn't specify the types. Sure, you can add <code>disabled</code> type in the <code>ButtonProps</code> interface. But what about the other default props?

Right! Let's expand the interface of our <code>Button</code> component.

```tsx
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
}
```

And now everything is fine. You can also use other default props that are contained in the <code>button</code> tag.

![no error](/images/component-props-reacts-most-useful-type-helper-no-error.jpg)

This is especially useful for extracting the props from components you don't control, perhaps from third-party libraries.

```tsx
import { ComponentProps } from 'react';
import { Button } from 'some-external-library';

type MyButtonProps = ComponentProps<typeof Button>;
```

And exactly the same if you create some other component. It can be <code>span</code>, <code>div</code> and so on. Good luck with your experiments 🙌
