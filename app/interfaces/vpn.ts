export interface Country {
  name: string;
  code: string;
}

export interface VPNProps {
  countries?: [Country]; // Response for GET request - return all available countries
}

export interface CountryResponse {
  country: string;
  error?: string;
}
