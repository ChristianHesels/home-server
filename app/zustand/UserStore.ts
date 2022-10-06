import create from 'zustand';
import {persist} from 'zustand/middleware';
import {UserStore} from '../interfaces/userstore';
import {User} from '../interfaces/user';

const useUserStore = create(
  persist<UserStore>(
    set => ({
      user: null,
      setUser: (user: User | null) => set({user: user}),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
