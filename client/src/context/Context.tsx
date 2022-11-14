import { createContext } from 'react';

interface userInterface {
  userDetails: any;
  setUserDetails: any;
}
export const UserContext = createContext<Partial<userInterface>>({});
