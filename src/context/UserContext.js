import { createContext } from 'react';

export const UserContext = createContext({
  userRole: 'ap-clerk',
  setUserRole: () => {}
});
