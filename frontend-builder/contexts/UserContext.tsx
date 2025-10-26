'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    // Mock implementation: password parameter accepted for interface compliance
    // In production, this would validate credentials against an authentication API
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      subscription: 'free',
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
