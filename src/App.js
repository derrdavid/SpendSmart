import { Container, ThemeProvider, createTheme } from '@mui/material';
import DashboardPage from './pages/DashboardPage';
import DashboardDrawer from './components/Dashboard/DashboardDrawer';
import DashboardFooter from './components/Dashboard/DashboardFooter';
import { DateProvider } from './contexts/DateContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { BudgetProvider } from './contexts/BudgetContext';
import { SavingsProvider } from './contexts/SavingsContext';

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
    <>
      <ThemeProvider theme={theme}>
        <DashboardDrawer />
        <DateProvider>
          <ExpenseProvider>
            <BudgetProvider>
              <CategoryProvider>
                <SavingsProvider>
                  <Container style={{
                    justifyContent: 'center'
                  }}>
                    <DashboardPage></DashboardPage>
                  </Container>
                </SavingsProvider>
              </CategoryProvider>
            </BudgetProvider>
          </ExpenseProvider>
        </DateProvider>
        <DashboardFooter />
      </ThemeProvider >
    </>
  );
}

export default App;
