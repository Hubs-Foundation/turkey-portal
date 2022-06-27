type LoginLayoutPropsT = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: LoginLayoutPropsT) => {
  return (
    <>
      <div>You Are logged out!</div>
      {children}
    </>
  );
};

export default LoginLayout;
