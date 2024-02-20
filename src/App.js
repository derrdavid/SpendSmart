import Dashboard from './components/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
