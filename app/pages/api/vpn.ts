// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next';
import {exec} from 'child_process'; // use exec to execute VPN Switch Script
import {
  CountryNextApiRequest,
  CountryListResponse,
} from '../../interfaces/country';
import path from 'path';
import {promises as fs} from 'fs';

export default async function handler(
  req: CountryNextApiRequest,
  res: NextApiResponse<CountryListResponse>
) {
  if (req.method === 'POST') {
    const country = req.body.country;
    exec('./scripts/switch_vpn.sh ' + country, (error, stdout, stderr) => {
      if (error !== null) {
        res.status(400).json({error: 'Could not execute script'});
      } else {
        res.status(200).json({country: country});
      }
    });
  }

  if (req.method === 'GET') {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const nordVPNCountries = await fs.readFile(
      jsonDirectory + '/nordvpn_countries.json',
      'utf8'
    );
    res.status(200).json(JSON.parse(nordVPNCountries));
  }
}
