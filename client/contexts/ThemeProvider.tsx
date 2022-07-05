import { useState, createContext, ReactNode } from 'react';

type ThemeProviderProps = {
  children?: ReactNode;
};

export enum ThemeE {
  LIGHT = 'light',
  DARK = 'dark',
}

export const ThemeContext = createContext({
  theme: ThemeE.LIGHT,
  handleThemeChange: (value: ThemeE) => {},
});

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeE>(ThemeE.LIGHT);

  const handleThemeChange = (value: ThemeE): void => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        handleThemeChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
