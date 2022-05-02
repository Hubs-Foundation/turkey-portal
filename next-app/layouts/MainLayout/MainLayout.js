import MainNav from '../../components/navigation/MainNav/MainNav'

const MainLayout = ({children}) => {
  return (
    <div>
      <MainNav/>
      {children}
    </div>
  )
}

export default MainLayout
