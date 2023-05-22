import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AppBar from 'src/components/AppBar'
import Modal from 'src/components/Modal'
import SpeedDial from 'src/components/SpeedDial'
import LoadingProgress from 'src/components/LoadingProgress';
import AnimatedPage from 'src/components/LoadingProgress/AnimatedPage';

const DashboardPage = () => {
  return (
    <>
      <LoadingProgress/>
      <AnimatedPage>
      <AppBar/>
      </AnimatedPage>
      <SpeedDial/>
    </>
  )
}

export default DashboardPage
