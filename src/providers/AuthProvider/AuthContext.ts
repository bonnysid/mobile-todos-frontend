import { createContext } from 'react';
import { IRequestData } from '../../api';

export interface IAuthContext extends IRequestData {
    isAuth: boolean;
    onLogin: (username: string, password: string) => Promise<void>;
    onRegistration: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const initialState: IAuthContext = {
    isAuth: false,
    isError: false,
    error: '',
    isLoading: false,
    resetError: () => {},
    onLogin: async () => {},
    onRegistration: async () => {},
    logout: async () => {},
}

export const AuthContext = createContext(initialState);
