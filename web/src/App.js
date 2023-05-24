import { ThemeProvider, createTheme } from '@mui/material/styles'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="TCC MANAGER">
      <RedwoodApolloProvider>
        <ThemeProvider theme={darkTheme}>
          <Routes />
        </ThemeProvider>
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
