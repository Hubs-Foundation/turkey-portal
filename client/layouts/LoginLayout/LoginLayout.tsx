import React from 'react'

type LoginLayoutPropsT = {
  children: React.ReactNode,
}

const LoginLayout = ({ children }: LoginLayoutPropsT) => {
  return (
    <div>
      <div>You Are logged out!</div>
      {children}
    </div>
  )
}

export default LoginLayout

