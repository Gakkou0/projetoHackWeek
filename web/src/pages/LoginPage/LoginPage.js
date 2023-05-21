/* eslint-disable prettier/prettier */
import { TextField, FormControl, Button, Typography } from '@mui/material'

// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <Typography variant="h4" component="h2" style={{ width: '250px', textAlign: 'center' }}>
        Login
      </Typography>
      ;

      <FormControl size="medium">
        <TextField
          id="outlined-basic"
          label="E-mail"
          type="email"
          variant="outlined"
          style={{ margin: '5px' }}
        />

        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          type="password"
          style={{ margin: '5px' }}
        />

        <Button variant="contained" style={{ margin: '5px' }}>
          Entrar
        </Button>
      </FormControl>
    </>
  )
}

export default LoginPage
