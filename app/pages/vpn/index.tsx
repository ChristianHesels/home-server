import {GetStaticProps, NextPage} from 'next';
import React from 'react';
import {VPNProps} from '../../interfaces/vpn';
import {getCountries} from '../../lib/api';
import VPN from './VPN';

const Index: NextPage = (props: VPNProps) => {
  return <VPN countries={props.countries} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const {countries} = await getCountries();

  return {
    props: {
      countries,
    },
  };
};

export default Index;
