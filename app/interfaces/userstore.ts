import {UserLoginResponse} from './user';

export interface UserStore {
  user: UserLoginResponse | null;
  setUser: (user: UserLoginResponse | null) => void;
}
