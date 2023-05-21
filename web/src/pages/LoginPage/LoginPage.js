/* eslint-disable prettier/prettier */
import { TextField, Button, Typography } from '@mui/material'

import { Form/*, FieldError, Submit*/ } from '@redwoodjs/forms'
import { Link/*, routes*/ } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <Form className="form">
        <Typography variant="h4" component="h2">
          Entrar
        </Typography>

        <TextField
          id="outlined-basic"
          label="E-mail"
          type="email"
          variant="outlined"
          className="input"
          style={{ margin: '7px' }}
        />

        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          type="password"
          className="input"
          style={{ margin: '7px' }}
        />

        <Button variant="contained" style={{ margin: '7px' }}>
          Entrar
        </Button>

        <Link to="/users/new" className="link">
          Crie uma conta
        </Link>
      </Form>
    </>
  )
}

export default LoginPage
