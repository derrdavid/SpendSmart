import { Container, ThemeProvider, createTheme } from '@mui/material';
import DashboardPage from './pages/DashboardPage';
import DashboardDrawer from './components/DashboardDrawer';
import DashboardFooter from './components/DashboardFooter';

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
        <DashboardDrawer />
        <Container style={{
          justifyContent: 'center'
        }}>
          <DashboardPage></DashboardPage>
        </Container>
        <DashboardFooter />
    </ThemeProvider >
  );
}

export default App;
