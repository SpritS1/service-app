import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "firebase.js";

interface IAuthContextType {
  user: User | null;
  isUserStatusChecked: boolean;
  signUp: (email: string, password: string, callback: VoidFunction) => void;
  signIn: (email: string, password: string, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<IAuthContextType>(null!);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserStatusChecked, setIsUserStatusChecked] = useState<boolean>(
    false
  );

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
    else setUser(null);

    setIsUserStatusChecked(true);
  });

  const logout = (callback: VoidFunction) => {
    signOut(auth)
      .then(() => callback())
      .catch((error) => console.log(error));
  };

  const signIn = (email: string, password: string, callback: VoidFunction) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => callback())
      .catch((error) => console.log(error.message));
  };

  const signUp = (email: string, password: string, callback: VoidFunction) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => callback())
      .catch((error) => console.log(error.message));
  };

  const value = {
    user,
    isUserStatusChecked,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
