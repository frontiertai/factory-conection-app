// context/UserContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  location: string;
  type: 'factory' | 'engineer';
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (user: User) => setUserState(user);
  const clearUser = () => setUserState(null);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

