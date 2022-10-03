import '../styles/globals.css';
import type {AppProps} from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '../components/AppBar';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {ToastContainer} from 'react-toastify';
import createEmotionCache from '../utils/createEmotionCache';
import {CacheProvider, EmotionCache} from '@emotion/react';
import styles from '../styles/Home.module.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#1d1d1f',
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

const clientSideEmotionCache = createEmotionCache();
interface AppPropsWithCache extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithCache) {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <AppBar />
          <Component {...pageProps} />
          <footer className={styles.footer}>© Christian Hesels 2022</footer>
        </ThemeProvider>
        <ToastContainer />
      </CacheProvider>
    </>
  );
}

export default MyApp;
