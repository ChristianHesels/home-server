import {NextApiRequest, NextApiResponse} from 'next';
import {VPNProps} from '../../../interfaces/vpn';
import path from 'path';
import {promises as fs} from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse<VPNProps>) => {
  if (req.method === 'GET') {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const nordVPNCountries = await fs.readFile(
      jsonDirectory + '/nordvpn_countries.json',
      'utf8'
    );
    res.status(200).json(JSON.parse(nordVPNCountries));
  } else if (req.method === 'POST') {
    res.status(400).json({countries: [{name: '', code: ''}]});
  }
};
