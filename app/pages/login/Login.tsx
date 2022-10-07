import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {cms} from '../../config';
import useUserStore from '../../zustand/UserStore';
import {ApiError} from '../../interfaces/api';
import {toast} from 'react-toastify';
import Router from 'next/router';
import FullPageLoader from '../../components/FullPageLoader';
import useUser from '../../lib/useUser';

export default function Login() {
  const {setUser, user: storeUser} = useUserStore();

  const {user, error} = useUser({redirectTo: '/', redirectIfFound: true});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData = new FormData(event.currentTarget);
    fetch(cms + '/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: loginData.get('email'),
        password: loginData.get('password'),
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(resJson => {
        if (resJson) {
          setUser(resJson);
          Router.push('/');
        } else {
          setUser(null);
        }
      })
      .catch(res => {
        const error = res as ApiError;
        toast(error.data[0].messages[0].message, {
          autoClose: 1000,
          type: 'error',
        });
      });
  };
  if (storeUser || (!user && !error)) {
    console.log(storeUser);
    return <FullPageLoader />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
