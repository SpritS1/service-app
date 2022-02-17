import { createContext, ReactNode, useState, useCallback } from 'react';
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    User,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from 'firebase.js';

interface IAuthContextType {
    user: User | null;
    isUserStatusChecked: boolean;
    errorMessage: string | null;
    errorField: 'email' | 'password' | 'confirmPassword' | 'popup' | null;
    cleanError: VoidFunction;
    setErrorMessage: (value: string | null) => void;
    setErrorField: (
        value: 'email' | 'password' | 'confirmPassword' | 'popup' | null,
    ) => void;
    signUp: (email: string, password: string, callback: VoidFunction) => void;
    signIn: (email: string, password: string, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<IAuthContextType>(null!);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isUserStatusChecked, setIsUserStatusChecked] =
        useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorField, setErrorField] = useState<
        'email' | 'password' | 'confirmPassword' | 'popup' | null
    >(null);

    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);

        setIsUserStatusChecked(true);
    });

    const cleanError = useCallback(() => {
        setErrorField(null);
        setErrorMessage(null);
    }, [setErrorField, setErrorMessage]);

    const validateError = (errorCode: string) => {
        if (errorCode === 'auth/invalid-email') {
            setErrorMessage('Invalid email');
            setErrorField('email');
        } else if (errorCode === 'auth/user-not-found') {
            setErrorMessage('User not found');
            setErrorField('email');
        } else if (errorCode === 'auth/email-already-in-use') {
            setErrorMessage('Email already in use');
            setErrorField('email');
        } else if (errorCode === 'auth/wrong-password') {
            setErrorMessage('Wrong password');
            setErrorField('password');
        } else if (errorCode === 'auth/weak-password') {
            setErrorMessage('Password must be at least 6 characters');
            setErrorField('password');
        } else {
            setErrorMessage(null);
            setErrorMessage(errorCode);
            setErrorField('popup');
        }
        console.log(errorMessage);
    };

    const logout = (callback: VoidFunction) => {
        signOut(auth)
            .then(() => callback())
            .catch((error) => console.log(error.code));
    };

    const signIn = (
        email: string,
        password: string,
        callback: VoidFunction,
    ) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((credentials) => callback())
            .catch((error) => validateError(error.code));
    };

    const signUp = (
        email: string,
        password: string,
        callback: VoidFunction,
    ) => {
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
        errorMessage,
        errorField,
        setErrorField,
        setErrorMessage,
        cleanError,
        signUp,
        signIn,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
