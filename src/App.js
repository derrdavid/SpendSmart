import Dashboard from './components/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette:{
    mode: 'dark'
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#A5C9CA',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
          color:'#395B64',
          borderRadius: 10
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#395B64'
        }
      }
    }
  },
});

function App() {
  return(
    <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
