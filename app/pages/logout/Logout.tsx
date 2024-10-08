import {Box} from '@mui/material';
import Router from 'next/router';
import React, {useEffect} from 'react';
import styles from '../../styles/Home.module.css';
import useUserStore from '../../zustand/UserStore';

const Logout = () => {
  const {setUser} = useUserStore();
  useEffect(() => {
    setUser(null);

    const forwardToLogin = setTimeout(() => Router.push('/login'), 5000);
    return () => clearTimeout(forwardToLogin);
  }, [setUser]);

  return <Box className={styles.box}>You have been logged out</Box>;
};

export default Logout;
