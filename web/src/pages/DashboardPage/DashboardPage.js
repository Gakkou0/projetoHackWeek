import { Link, routes } from '@redwoodjs/router'
import AppBar from 'src/components/AppBar'
import SpeedDial from 'src/components/SpeedDial'
import LoadingProgress from 'src/components/LoadingProgress';
import AnimatedPage from 'src/components/LoadingProgress/AnimatedPage';
import MeetingCardList from 'src/components/MeetingListDate/MeetingListDateAfter';
import '../../index.css'

const DashboardPage = () => {
  return (
    <>
      <LoadingProgress/>
      <AnimatedPage>
      <AppBar/>
      <MeetingCardList/>
      </AnimatedPage>
      <SpeedDial/>
    </>
  )
}

export default DashboardPage
