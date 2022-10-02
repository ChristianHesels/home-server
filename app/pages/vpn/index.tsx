import React, {useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import {Button, Container} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {toast} from 'react-toastify';

export default function index() {
  const [country, setCountry] = useState('DE');

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const changeCountryPost = () => {
    const response = fetch('/api/vpn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({country: country}),
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
  };

  return (
    <div>
      <Container>
        <h1> VPN Controller</h1>
        <Select
          labelId="select-country-id"
          id="select-country"
          color="secondary"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          <MenuItem value={'DE'}>Deutschland</MenuItem>
          <MenuItem value={'CA'}>Kanada</MenuItem>
          <MenuItem value={'US'}>USA</MenuItem>
          <MenuItem value={'test'}>test</MenuItem>
        </Select>
        <Button onClick={changeCountryPost}>Switch VPN</Button>
      </Container>
    </div>
  );
}
