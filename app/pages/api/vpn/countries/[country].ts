import {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process'; // use exec to execute VPN Switch Script
import {CountryResponse} from '../../../../interfaces/vpn';

export default (req: NextApiRequest, res: NextApiResponse<CountryResponse>) => {
  if (req.method === 'POST') {
    const country = req.query.country;
    if (typeof country !== 'string' || country === '') {
      res
        .status(400)
        .json({country: '', error: 'Country is empty or not a string'});
    } else {
      if (country !== 'test') {
        exec('./scripts/switch_vpn.sh ' + country, error => {
          if (error !== null) {
            res.status(400).json({
              country: country,
              error: 'Could not switch VPN (NordVPN Cli installed?)',
            });
          } else {
            res.status(200).json({country: country});
          }
        });
      }
    }
  }
};
