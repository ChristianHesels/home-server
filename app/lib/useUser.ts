import {useEffect} from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import {cms} from '../config';
import {User} from '../interfaces/user';
import {ApiError} from '../interfaces/api';
import useUserStore from '../zustand/UserStore';

const fetcher = (url: string, token: string) =>
  fetch(url, {headers: {Authorization: 'Bearer ' + token}}).then(async res => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      // Attach extra info to the error object.
      error.message = await res.json();
      throw error;
    }
    return res.json();
  });

export default function useUser({
  redirectTo = '/login',
  redirectIfFound = false,
} = {}) {
  const {user} = useUserStore();

  const {data, error} = useSWR<User, ApiError>(
    [cms + '/users/me', user?.jwt],
    fetcher
  );

  useEffect(() => {
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, data]);

  return {user: data, error: error};
}
