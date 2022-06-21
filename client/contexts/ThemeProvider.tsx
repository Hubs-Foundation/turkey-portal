import { useState, createContext, ReactNode } from 'react';

type ThemeProviderkProps = {
  children?: ReactNode;
};

export enum ThemeE {
  light = 'light',
  dark = 'dark',
}

export const ThemeContext = createContext({
  theme: ThemeE.dark,
  handleThemeChange: (value: ThemeE) => {},
});

const ThemeProvider = ({ children }: ThemeProviderkProps) => {
  // Check if a logged out route
  const [theme, setTheme] = useState<ThemeE>(ThemeE.light);

  const handleThemeChange = (value: ThemeE): void => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider
      value={{
        'theme':theme,
        handleThemeChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
