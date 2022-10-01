import '../styles/globals.css';
import type {AppProps} from 'next/app';
import AppBar from '../components/AppBar';
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#383838',
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 60,
    },
  },
});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
