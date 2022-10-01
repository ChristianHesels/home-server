import type {NextApiRequest} from 'next';

export interface CountryNextApiRequest extends NextApiRequest {
  body: {
    country: string;
  };
}
