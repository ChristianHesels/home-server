import {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process'; // use exec to execute VPN Switch Script
import {CountryResponse} from '../../../../interfaces/country';

export default (req: NextApiRequest, res: NextApiResponse<CountryResponse>) => {
  if (req.method === 'POST') {
    const country = req.query.country;
    if (typeof country !== 'string') {
      res.status(400);
    } else {
      if (country !== 'test') {
        exec('./scripts/switch_vpn.sh ' + country, error => {
          if (error !== null) {
            res.status(400);
          } else {
            res.status(200).json({country: country});
          }
        });
      }
      res.status(200).json({country: country});
    }
  }
};
