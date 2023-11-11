---
title: 'Switching color themes in the React app'
date: '2023-05-02'
tags: 'React_Typescript_CSS'
shortDescription: "Switching color themes is a really popular theme right now. Let's see how we can work with this."
---

Switching color themes is gaining popularity, especially the dark mode for applications. And the main goal of this post is to create some kind of universal function to manage your color themes, even if the design team wants to add a special color theme, it won't be so difficult to add it 😉

Let's get started 🚀

We will switch the theme really easy changing the content of the attribute <code>data-theme</code>

```js
document.documentElement.setAttribute('data-theme', theme);
```

The value of the theme will be a string with the name of the theme.
For instance: <code>dark</code>, <code>light</code> or something else, maybe even <code>spacedogs3000</code> 😄

It's time to use custom properties [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
We will use the select by attribute that we configured above, and let's start describing the variables:

```css
[data-theme='light'] {
  /* some vars here */
}
```

I have created a <code>themes.css</code> file and put several different themes inside:

```css
:root {
  /* light theme */
  --background-color-primary-light: #ffffff;
  --accent-color-light: #3a3a3a;

  /* dark theme */
  --background-primary-dark: #232528;
  --accent-color-dark: #dae2e8;

  /* spacedogs3000 theme */
  --background-primary-spacedogs3000: #191437;
  --accent-color-spacedogs3000: #dacc34;
}

[data-theme='light'] {
  --background-primary: var(--background-color-primary-light);
  --accent: var(--accent-color-light);
}

[data-theme='dark'] {
  --background-primary: var(--background-primary-dark);
  --accent: var(--accent-color-dark);
}

[data-theme='spacedogs3000'] {
  --background-primary: var(--background-primary-spacedogs3000);
  --accent: var(--accent-color-spacedogs3000);
}
```

Actually this post doesn't even cover and a small part of dark mode and colors. If you are interested you can go [there](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/). There is described in more detail.

Now let's declare all the available themes and context: <br/>
(You can put this file in your <code>components</code> directory or somewhere else depending on your project. Actually you can divide this file into several fiels. For example create helpers, enums and so on in order to get more structured structure)

```tsx
import React, { useEffect, createContext, useState, useContext } from 'react';

const localStorageKey = 'color-theme';

const supportedThemes = {
  light: 'light',
  dark: 'dark',
  spacedogs3000: 'spacedogs3000',
};

type ThemeName = keyof typeof supportedThemes;

type ThemeContextTypes = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  supportedThemes: { [key: string]: string };
};

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.',
    );
  }

  return context;
};

const getTheme = () => {
  let theme = localStorage.getItem(localStorageKey);

  if (!theme) {
    localStorage.setItem(localStorageKey, 'light');
    theme = 'light';
  }

  return theme as ThemeName;
};

const ThemeProvider = ({ children }: React.ReactNode) => {
  const [theme, setTheme] = useState<ThemeName>(getTheme);

  useEffect(() => {
    localStorage.setItem(localStorageKey, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        supportedThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
```

Ok. We got it. Let's modify the main <code>index.css</code> file a bit and put our variables there:

```css
body {
  /* some styles */
  color: var(--accent);
  background-color: var(--background-primary);
}
```

And the last part is we need to wrap the main component of the application in our <code>ThemeProvider</code>:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ThemeProvider from './components/ThemeProvider/index';
import './index.css';
import './themes.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

Now we can try it:

```tsx
import './YourComponent.module.css';
import { useTheme } from './components/ThemeProvider';

function YourComponent() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () =>
    theme === 'dark' ? setTheme('light') : setTheme('dark');

  const setSpecialTheme = () => setTheme('spacedogs3000');

  return (
    <>
      <button onClick={handleToggleTheme}>Toogle theme</button>
      <button onClick={setSpecialTheme}>Activate a special theme</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas minus obcaecati
        consequuntur ex necessitatibus nisi labore perferendis nulla quod?
      </p>
    </>
  );
}

export default SomeComponent;
```

Thanks for reading and good luck in theming your apps 🙌
