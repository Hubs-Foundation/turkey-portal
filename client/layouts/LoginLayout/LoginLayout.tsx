import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/ThemeProvider';

type LoginLayoutPropsT = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: LoginLayoutPropsT) => {
  const themeContext = useContext(ThemeContext);
  return (
    <main data-theme={themeContext.theme}>
      <div>You Are logged out!</div>
      {children}
    </main>
  );
};

export default LoginLayout;
