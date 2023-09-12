import Loader from 'components/Loader/Loader';
import { ApiResponse } from 'models/Api';
import { User } from 'models/User';
import React, { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IAuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, firstname: string, lastname: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

export const NewAuthContext = createContext<IAuthContextType>(null!);

const NewAuthContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log(`User: ${user ? JSON.stringify(user) : 'null'}`);
    }, [user]);

    useEffect(() => {
        const checkIfAuthenticated = async () => {
            try {
                const response = await fetch('http://localhost:8000/profile', {
                    credentials: 'include',
                });
                const data: ApiResponse<User> = await response.json();
                setIsAuthenticated(data.success);
                if (data.success && data.data) {
                    setUser(data?.data);
                    console.log('User is authenticated');
                    navigate('/');
                    return;
                }
                console.log('User is NOT authenticated');
                navigate('/auth/login');
            } catch (error) {
                console.error('Error checking authentication:', error);
                navigate('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        checkIfAuthenticated();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (email: string, password: string) => {
        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 'include' will send cookies with the request
            body: JSON.stringify({ email, password }),
        });

        const data: ApiResponse<User> = await response.json();

        if (data.success) {
            setIsAuthenticated(true);
            console.log(`Login response: ${JSON.stringify(data)}`);
            if (data.data) setUser(data.data);
            return true;
        }

        if (data.error) console.error(data.error);

        return false;
    };

    const register = async (email: string, password: string, firstname: string, lastname: string) => {
        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 'include' will send cookies with the request
            body: JSON.stringify({ email, password, firstname, lastname }),
        });
        const data: ApiResponse = await response.json();

        if (data.success) {
            setIsAuthenticated(true);
            return true;
        }

        if (data.error) {
            console.error(data.error);
        }

        return false;
    };

    const logout = async () => {
        const response = await fetch('http://localhost:8000/auth/logout', {
            credentials: 'include',
        });

        const data: ApiResponse = await response.json();
        console.log(`Logout response: ${JSON.stringify(data)}`);

        if (data.success) {
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        if (data.error) {
            console.error(data.error);
        }
    };

    const value = {
        user,
        setUser,
        login,
        register,
        logout,
        isAuthenticated,
    };

    if (isLoading) {
        return <Loader />; // Show loading screen if isLoading is true
    }

    return <NewAuthContext.Provider value={value}>{children}</NewAuthContext.Provider>;
};

export default NewAuthContextProvider;

export const useAuth = () => {
    return React.useContext(NewAuthContext);
};
