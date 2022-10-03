import React, {useState, useEffect} from 'react';
import useSWR from 'swr';
import MenuItem from '@mui/material/MenuItem';
import {Button, Container, FormControl, Paper} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {toast} from 'react-toastify';
import styles from '../../styles/Home.module.css';
import {CountryListResponse, Country} from '../../interfaces/country';

const countryFetcher = (url: string) => fetch(url).then(res => res.json());

export default function index() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState<[Country]>();

  const {data, error} = useSWR<CountryListResponse, Error>(
    '/api/vpn/countries/',
    countryFetcher
  );

  useEffect(() => {
    if (error) {
      toast('Failed to load Country list', {
        autoClose: 3000,
        type: 'error',
      });
    }

    if (data) {
      setCountries(data.countries);
    }
  }, [error, data]);

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const changeCountryPost = () =>
    fetch('/api/vpn/countries/' + country, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (!response.ok) {
        toast('Error switching Country', {
          autoClose: 1000,
          type: 'error',
        });
      } else {
        response.json().then(data =>
          toast('Switched to ' + data.country, {
            autoClose: 1000,
            type: 'success',
          })
        );
      }
    });

  return (
    <div>
      <Paper className={styles.paper}>
        <h1> VPN Controller</h1>
        <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
          <Select
            labelId="select-country-id"
            id="select-country"
            color="secondary"
            value={country}
            label="Country"
            onChange={handleChange}
            className={styles.select}
          >
            {countries?.map(country => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
            <MenuItem key={'test'} value={'test'}>
              test
            </MenuItem>
          </Select>
          <Button variant="contained" onClick={changeCountryPost}>
            Switch VPN
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
}
