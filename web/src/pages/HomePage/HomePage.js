import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, routes } from '@redwoodjs/router'
import LoadingProgress from 'src/components/LoadingProgress';
import AnimatedPage from 'src/components/LoadingProgress/AnimatedPage';

function Copyright(props) {
  return (

    <Typography variant="body2" color="text.secondary" align="center" {...props} className='.vertical-center'>
      {'Copyright © '}
      <Link color="inherit" target='_blank'>
        UFC - CAMPUS CRATEÚS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = darkTheme => createTheme(darkTheme, {
  palette:
  {
    mode: '#635985',
    primary: {
      main: '#635985',
    },
  }
});


export default function SignInSide() {
  const handleSubmit = (event) => {
  };

  return (

    <ThemeProvider theme={defaultTheme}>
    <AnimatedPage>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
            t.palette.mode === 'light' ? "#635985" : "#635985",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', // Centralizar verticalmente
              height: '80vh',
            }}
          >
            <LoadingProgress/>
            {/* // Componente de loading */}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              TCC Manager
            </Typography>
            <br></br>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <p style={{ textAlign: 'center' }}>
                <Link to={routes.login()}>
                  <Button variant="contained" style={{ margin: '5px' }}>
                    Entrar
                  </Button>
                </Link>
                <br/>
                <Link to={routes.newUser()}>
                  <Button variant="outlined" style={{ margin: '5px' }}>
                    Cadastre-se
                  </Button>
                </Link>
              </p>
              <Grid container>
                <Grid item xs>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      </AnimatedPage>
    </ThemeProvider>
  );
}
