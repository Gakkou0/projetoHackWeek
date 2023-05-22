import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AppBar from 'src/components/AppBar'
import TextField  from 'src/components/TextField'
import LoadingProgress from 'src/components/LoadingProgress';
import AnimatedPage from 'src/components/LoadingProgress/AnimatedPage';

const HistoricPage = () => {
  return (
    <>
      <AnimatedPage>
      <LoadingProgress/>
      <AppBar/>
      <TextField
      />
      </AnimatedPage>

    </>
  )
}
export default HistoricPage
