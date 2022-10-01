// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next';
import {CountryNextApiRequest} from '../../interfaces/country';

export default function handler(
  req: CountryNextApiRequest,
  res: NextApiResponse<{country: string}>
) {
  if (req.method === 'POST') {
    const country = req.body.country;
    console.log(country);

    res.status(200).json({country: country});
  }
}
