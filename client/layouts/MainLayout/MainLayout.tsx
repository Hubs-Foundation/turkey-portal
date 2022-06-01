import React from 'react'
import MainNav from '@Components/navigation/MainNav/MainNav'

type MainLayoutPropsT = {
  children: React.ReactNode,
}

const MainLayout = ({ children }: MainLayoutPropsT) => {
  return (
    <div>
      <MainNav />
      {children}
    </div>
  )
}

export default MainLayout
