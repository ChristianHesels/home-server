import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Box} from '@mui/material';
import {Container} from '@mui/system';

const Home: NextPage = () => {
  return (
    <Box className={styles.box}>
      <Head>
        <title>Homeserver</title>
      </Head>
      <h1>Homeserver</h1>
      Project to access RaspAP and change NordVPN Connections,
      Activate/Deactivate IP-Tables and more to come..
    </Box>
  );
};

export default Home;
