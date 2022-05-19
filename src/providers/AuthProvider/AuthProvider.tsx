import { FC, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useUser } from '../../api';
import * as SecureStore from 'expo-secure-store';

export const AuthProvider: FC = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const { check, login, registration, isError, error, resetError, isLoading } = useUser();

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            if (token) {
                setIsAuth(true);
            } else {
                check().then(res => {
                    if (res?.token) {
                        setIsAuth(true);
                        SecureStore.setItemAsync('token', res.token);
                    } else {
                        setIsAuth(false);
                    }
                });
            }
        });
    }, []);

    const onLogin = async (username: string, password: string) => {
        if (username && password) {
            const res = await login(username, password);
            if (res?.token) {
                setIsAuth(true);
                await SecureStore.setItemAsync('token', res.token);
            } else {
                setIsAuth(false);
                await SecureStore.deleteItemAsync('token');
            }
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        setIsAuth(false);
    }

    const onRegistration = async (username: string, password: string) => {
        if (username && password) {
            const res = await registration(username, password);
            if (res?.token) {
                setIsAuth(true);
                await SecureStore.setItemAsync('token', res.token);
            } else {
                setIsAuth(false);
                await SecureStore.deleteItemAsync('token');
            }
        }
    }

    return (
        <AuthContext.Provider value={{ isAuth, onLogin, onRegistration, isError, error, resetError, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
