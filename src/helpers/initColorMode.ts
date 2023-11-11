export const initColorMode = `
(function() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('color-mode');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';

    if (hasPersistedPreference) {
      return persistedColorPreference;
    }

    const mql =window.matchMedia('(prefers-color-scheme: light)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    if (hasMediaQueryPreference) {
      return mql.matches ? 'light' : 'dark';
    }
    
    return 'dark';
  }

  const colorMode = getInitialColorMode();
  const root = document.documentElement;

  if (colorMode === 'dark' || !root.classList.contains('dark')) {
    root.classList.add('dark');
    root.classList.remove('light');
  }

  if (colorMode === 'light' || root.classList.contains('light')) {
    root.classList.remove('dark');
  }
})()`;
