import {User} from './user';

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
