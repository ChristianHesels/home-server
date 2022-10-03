import '../styles/globals.css';
import type {AppProps} from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '../components/AppBar';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {ToastContainer} from 'react-toastify';
import styles from '../styles/Home.module.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#000000',
    },
    secondary: {
      light: '#333333',
      main: '#ffffff',
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
        <footer className={styles.footer}>© Christian Hesels 2022</footer>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
