import { useCallback, useState } from 'react';
import { instance} from './instance';
import axios from 'axios';

export interface IRequestData {
    isError: boolean;
    error: string;
    isLoading: boolean;
    resetError: () => void;
}

export const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');

    const get = useCallback(async <T>(url: string) => {
        try {
            const source = await axios.CancelToken.source();
            setIsLoading(true);
            const res = await instance.get(url, { cancelToken: source.token });
            if (res.status !== 200) {
                setIsError(true);
                setError(res.data);
            } else {
                setIsError(false);
            }

            return await res.data as T;
        } catch (e) {
            setIsError(true);
            setError(e.message);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [])

    const post = useCallback(async <T, D = any>(url: string, data: D) => {
        try {
            setIsLoading(true);
            const res = await instance.post(url, data);
            if (res.status !== 200) {
                setIsError(true);
                setError(res.data);
            } else {
                setIsError(false);
            }

            return await res.data as T;
        } catch (e) {
            setIsError(true);
            setError(e.message);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [])

    const put = useCallback(async <T, D = any>(url: string, data: D) => {
        try {
            setIsLoading(true);
            const res = await instance.put(url, data);
            if (res.status !== 200) {
                setIsError(true);
                setError(res.data);
            } else {
                setIsError(false);
            }
            return await res.data as T;
        } catch (e) {
            setIsError(true);
            setError(e.message);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const remove = useCallback(async <T>(url: string) => {
        try {
            setIsLoading(true);
            const res = await instance.delete(url);
            if (res.status !== 200) {
                setIsError(true);
                setError(res.data);
            } else {
                setIsError(false);
            }
            return await res.data as T;
        } catch (e) {
            setIsError(true);
            setError(e.message);
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [])

    const resetError = useCallback(() => {
        setError('');
        setIsError(false);
    }, []);

    return {
        isLoading,
        isError,
        error,
        get,
        post,
        put,
        remove,
        resetError,
    }
}
