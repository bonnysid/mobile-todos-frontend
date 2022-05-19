import { useRequest } from './useRequest';
import SecureStore from 'expo-secure-store';

export const useUser = () => {
    const { get, post, put, remove, ...rest } = useRequest();

    const login = async (username: string, password: string) => {
        const data = await post<{ token: string }, { username: string, password: string }>(
            '/user/login',
            { username, password }
        );

        return data;
    }

    const registration = async (username: string, password: string) => {
        const data = await post<{ token: string }, { username: string, password: string }>(
            '/user/registration',
            { username, password }
        );

        return data;
    }

    const check = async () => {
        const data = await get<{ token: string }>('/user/auth');

        return data;
    }

    return {
        ...rest,
        login,
        registration,
        check,
    }
}
