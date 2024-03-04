import { Container, ThemeProvider, createTheme } from '@mui/material';
import DashboardPage from './pages/DashboardPage';
import DashboardDrawer from './components/Dashboard/DashboardDrawer';
import DashboardFooter from './components/Dashboard/DashboardFooter';
import { DateProvider } from './hooks/DateContext';
import { ExpenseProvider } from './hooks/ExpenseContext';
import { CategoryProvider } from './hooks/CategoryContext';
import { BudgetProvider } from './hooks/BudgetContext';

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
      <DateProvider>
        <ExpenseProvider>
          <BudgetProvider>
            <CategoryProvider>
              <Container style={{
                justifyContent: 'center'
              }}>
                <DashboardPage></DashboardPage>
              </Container>
            </CategoryProvider>
          </BudgetProvider>
        </ExpenseProvider>
      </DateProvider>
      <DashboardFooter />
    </ThemeProvider >
  );
}

export default App;
