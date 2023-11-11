import React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

type ThemeContextType = {
  colorMode: string;
  setColorMode: (value: string) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: 'light',
  setColorMode: () => null,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorMode, rawSetColorMode] = React.useState<any>('');

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.getAttribute('class') || 'light';
    rawSetColorMode(initialColorValue);
  }, []);

  const setColorMode = (newValue: string) => {
    const root = window.document.documentElement;
    rawSetColorMode(newValue);
    localStorage.setItem('color-mode', newValue);

    if (newValue === 'dark' || !root.classList.contains('dark')) {
      root.classList.add('dark');
      root.classList.remove('light');
    }

    if (newValue === 'light' || root.classList.contains('light')) {
      root.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
