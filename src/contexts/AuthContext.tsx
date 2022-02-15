import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "firebase.js";
import { useLocation } from "react-router-dom";

type errorType = {
  message: string;
  field: string | null;
} | null;

interface IAuthContextType {
  user: User | null;
  isUserStatusChecked: boolean;
  error: errorType;
  setError: (value: errorType) => void;
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
  const [error, setError] = useState<errorType>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
    else setUser(null);

    setIsUserStatusChecked(true);
  });

  const validateError = (errorCode: string) => {
    if (errorCode === "auth/invalid-email")
      setError({ message: "Invalid email", field: "email" });
    else if (errorCode === "auth/user-not-found")
      setError({ message: "User not found", field: "email" });
    else if (errorCode === "auth/email-already-in-use")
      setError({ message: "Email already in use", field: "email" });
    else if (errorCode === "auth/wrong-password")
      setError({ message: "Wrong password", field: "password" });
    else if (errorCode === "auth/weak-password")
      setError({
        message: "Password must be at least 6 characters",
        field: "password",
      });
    else setError({ message: errorCode, field: null });
  };

  const logout = (callback: VoidFunction) => {
    signOut(auth)
      .then(() => callback())
      .catch((error) => console.log(error.code));
  };

  const signIn = (email: string, password: string, callback: VoidFunction) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => callback())
      .catch((error) => validateError(error.code));
  };

  const signUp = (email: string, password: string, callback: VoidFunction) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => callback())
      .catch((error) => {
        console.log(error);
        validateError(error.code);
      });
  };

  const value = {
    user,
    isUserStatusChecked,
    error,
    setError,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
