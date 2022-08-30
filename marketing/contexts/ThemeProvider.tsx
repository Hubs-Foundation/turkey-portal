import { createContext, ReactNode } from 'react';
import useDarkMode from 'hooks/useDarkMode';
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
  const isDarkMode = useDarkMode();
  // Place holder if we want to add a toggle on the site later to change theme
  const handleThemeChange = (value: ThemeE): void => {};

  return (
    <ThemeContext.Provider
      value={{
        theme: isDarkMode ? ThemeE.DARK : ThemeE.LIGHT,
        handleThemeChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
