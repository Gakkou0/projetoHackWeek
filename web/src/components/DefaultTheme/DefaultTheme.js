import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = darkTheme => createTheme(darkTheme, {
  palette:
  {
    mode: '#635985',
    primary: {
      main: '#7A62CA',
    }
  }
});

export default defaultTheme;
