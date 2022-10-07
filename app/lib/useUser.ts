import {useEffect} from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import {cms} from '../config';
import {User, UserResponse} from '../interfaces/user';
import useUserStore from '../zustand/UserStore';

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',

    headers: new Headers({
      Accept: '*/*', // Needed only for ios Safari
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }),
  }).then(async res => res.json());

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const {user} = useUserStore();

  const {data} = useSWR<UserResponse>([cms + '/users/me', user?.jwt], fetcher);
  useEffect(() => {
    if (!redirectTo || !data) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data?.username) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data?.username)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, data]);

  return {user: data};
}
