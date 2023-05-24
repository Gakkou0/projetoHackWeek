/* eslint-disable prettier/prettier */
import { TextField, Button, Typography } from '@mui/material'
import { Form/*, FieldError, Submit*/ } from '@redwoodjs/forms'
import { Link/*, routes*/ } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import LoadingProgress from 'src/components/LoadingProgress';
import AnimatedPage from 'src/components/LoadingProgress/AnimatedPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import defaultTheme from 'src/components/DefaultTheme/DefaultTheme';

const LoginPage = () => {
  return (
    <>
    <AnimatedPage>
    <ThemeProvider theme={defaultTheme}>
    <LoadingProgress/>
      <div sx={
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: '50%',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#635985'
      }} >
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

        <Button variant="contained" style={{ margin: '7px' }}
         onClick={() => {
          window.location.href = '/dashboard'
        }}
        >
          Entrar
        </Button>

        <Link to="/users/new" className="link">
          Crie uma conta
        </Link>
      </Form>
      </div>
      </ThemeProvider>
    </AnimatedPage>
    </>
  )
}

export default LoginPage
