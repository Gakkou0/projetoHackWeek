import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AppBar from 'src/components/AppBar'
import Modal from 'src/components/Modal'
import SpeedDial from 'src/components/SpeedDial'

const DashboardPage = () => {
  return (
    <>
      <AppBar/>
      <Modal
        title="HUGOSTOSO"
        description="HUGO SONIC DA SILVA"
      />
      <SpeedDial
      />
    </>
  )
}

export default DashboardPage
