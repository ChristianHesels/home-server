export interface User {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean | null;
    role: {
      id: number;
      name: string;
      description: string;
      type: string;
    };
    created_at: string;
    updated_at: string;
  };
}

export interface Login {
  username: string;
  password: string;
}
