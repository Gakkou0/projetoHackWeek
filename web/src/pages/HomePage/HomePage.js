/* eslint-disable prettier/prettier */
import { Button } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <p>
        <Link to={routes.login()}>
          <Button variant="contained" style={{ margin: '5px' }}>
            Entrar
          </Button>
        </Link>
        <Link to={routes.newUser()}>
          <Button variant="outlined" style={{ margin: '5px' }}>
            Cadastre-se
          </Button>
        </Link>
      </p>
    </>
  )
}

export default HomePage
