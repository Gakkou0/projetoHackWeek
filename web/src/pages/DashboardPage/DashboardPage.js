import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AppBar from 'src/components/AppBar'

const DashboardPage = () => {
  return (
    <>
      <AppBar/>
      <MetaTags title="Dashboard" description="Dashboard page" />
      <h1>DashboardPage</h1>
    </>
  )
}

export default DashboardPage
