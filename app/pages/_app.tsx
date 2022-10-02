import '../styles/globals.css';
import type {AppProps} from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '../components/AppBar';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {ToastContainer} from 'react-toastify';

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
    <>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
