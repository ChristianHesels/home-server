import type {NextApiRequest} from 'next';

export interface CountryNextApiRequest extends NextApiRequest {
  body: {
    country: string;
  };
}

export interface Country {
  name: string;
  code: string;
}

export interface CountryListResponse {
  countries?: [Country]; // Response for GET request - return all available countries
  error?: string; // If something goes wrong - respond with error string
  country?: string; // If country was successfully changed, respond with the requested country
}
