import { database } from 'firebase.js';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import React, { createContext, useEffect, useState } from 'react';

interface IUserDataContext {
    userData: DocumentData | null;
    isFetching: boolean;
}

const defaultState = {
    userData: null,
    isFetching: true,
};

export const UserDataContext = createContext<IUserDataContext>(defaultState);

const UserDataContextProvider = ({ children }: { children: JSX.Element }) => {
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        const fetchUserData = () => {
            if (user)
                onSnapshot(doc(database, 'users_data', user.uid), (snap) => {
                    const userData = snap.data();

                    if (userData) {
                        setUserData(userData);
                        setIsFetching(false);
                    }
                });
        };

        try {
            fetchUserData();
        } catch (error) {
            console.error(error);
        }
    }, [user]);

    const value = { userData, isFetching };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContextProvider;
