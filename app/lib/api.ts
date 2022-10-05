import {CountriesQuery} from '../interfaces/api';
import {URLSearchParams} from 'url';
import {server} from '../config';

async function fetchAPI(
  endpoint: string,
  type: 'GET' | 'POST',
  variables?: CountriesQuery
) {
  const res = await fetch(
    server +
      '/api/' +
      endpoint +
      (variables ? '?' + new URLSearchParams(variables) : '/'),
    {
      method: type,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json;
}

export async function getCountries() {
  const data = await fetchAPI('vpn/countries', 'GET');
  return data;
}
