// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next';
import {exec} from 'child_process'; // use exec to execute VPN Switch Script
import {CountryNextApiRequest} from '../../interfaces/country';

export default function handler(
  req: CountryNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const country = req.body.country;
    if (country !== 'test') {
      exec('./scripts/switch_vpn.sh ' + country, (error, stdout, stderr) => {
        if (error !== null) {
          res.status(400).json({error: error});
        } else {
          res.status(200).json({country: country});
        }
      });
    } else {
      res.status(200).json({country: country});
    }
  }
}
