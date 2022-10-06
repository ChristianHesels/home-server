export interface CountriesQuery {
  [key: string]: string;
  country: string;
}

export interface ApiError {
  statusCode: number;
  error: string;
  message: [
    {
      messages: [
        {
          id: string;
          message: string;
        }
      ];
    }
  ];
  data: [
    {
      messages: [
        {
          id: string;
          message: string;
        }
      ];
    }
  ];
}
