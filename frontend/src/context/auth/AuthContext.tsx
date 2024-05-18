import { User } from 'myTypes';
import { FC, PropsWithChildren, createContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  loginUser: (val: User) => void;
  logoutUser: (val: User) => void;
}

const initialContextValue: AuthContextType = {
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
};

export const AuthContext = createContext(initialContextValue);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const loginUser = (val: User) => setUser(val);
  const logoutUser = (val: User) => {
    val.authToken = '';
    setUser(val);
  };
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
