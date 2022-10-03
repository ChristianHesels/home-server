import type {NextPage} from 'next';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Homeserver</title>
      </Head>

      <Paper className={styles.paper}>
        <h1>Homeserver</h1>
        Project to access RaspAP and change NordVPN Connections,
        Activate/Deactivate IP-Tables and more to come..
      </Paper>
    </div>
  );
};

export default Home;
