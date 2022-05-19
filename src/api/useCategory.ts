import { useRequest } from './useRequest';
import { ICategory } from '../types';

export interface ICategoryData {
    label: string;
    value: string;
}

export const useCategory = () => {
    const { get, post, put, remove, ...rest } = useRequest();

    const getCategory = async (id: number) => {
        return await get<ICategory>(`/category/${id}`);
    }

    const getCategories = async () => {
        return await get<ICategory[]>('/category');
    }

    const updateCategory = async (id: number, data: ICategoryData) => {
        return await put<ICategory, ICategoryData>(
            `/category/${id}`,
            data,
        );
    }

    const removeCategory = async (id: number) => {
        return await remove<ICategory>(`/category/${id}`);
    }

    const createCategory = async (data: ICategoryData) => {
        return await post<ICategory, ICategoryData>('/category', data);
    }

    return {
        rest,
        getCategory,
        getCategories,
        createCategory,
        updateCategory,
        removeCategory,
    }
}
