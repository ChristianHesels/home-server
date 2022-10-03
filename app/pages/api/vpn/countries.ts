import {NextApiRequest, NextApiResponse} from 'next';
import {CountryListResponse} from '../../../interfaces/country';
import path from 'path';
import {promises as fs} from 'fs';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryListResponse>
) => {
  if (req.method === 'GET') {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const nordVPNCountries = await fs.readFile(
      jsonDirectory + '/nordvpn_countries.json',
      'utf8'
    );
    res.status(200).json(JSON.parse(nordVPNCountries));
  }
};
