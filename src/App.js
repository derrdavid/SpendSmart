import { ThemeProvider, createTheme } from '@mui/material';
import DashboardPage from './pages/DashboardPage';
import DashboardDrawer from './components/DashboardDrawer';
import { ExpenseProvider } from './hooks/ExpenseContext';
import { CategoryProvider } from './hooks/CategoryContext';

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
      <div style={{ display: 'flex', height: '90vh' }}>
        <DashboardDrawer />
        <div style={{
          width: '100%',
          justifyContent: 'center'
        }}>
          <DashboardPage></DashboardPage>
        </div>
      </div>
    </ThemeProvider >
  );
}

export default App;
