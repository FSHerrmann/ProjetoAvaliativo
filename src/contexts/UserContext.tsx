// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getUsers, setUsers } from "../services/storage";
import type { User } from "../services/storage";

interface UserContextData {
  users: User[];
  currentUser: User | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  register: (data: Omit<User, "id">) => boolean;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUserList] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setUserList(getUsers());
  }, []);

  const login = (email: string, senha: string) => {
    const user = users.find(u => u.email === email && u.senha === senha);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (data: Omit<User, "id">) => {
    if (users.some(u => u.cpf === data.cpf)) return false;
    const newUser: User = { id: Date.now().toString(), ...data };
    const updated = [...users, newUser];
    setUserList(updated);
    setUsers(updated);
    return true;
  };

  return (
    <UserContext.Provider value={{ users, currentUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
