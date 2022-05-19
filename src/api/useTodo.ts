import { useRequest } from './useRequest';
import { ITodo } from '../types';

export interface ITodoData {
    title: string;
    description: string;
    categories: number[];
    completed?: boolean;
}

export const useTodo = () => {
    const { get, post, put, remove, ...rest } = useRequest();

    const getTodo = async (id: number) => {
        return await get<ITodo>(`/todo/${id}`);
    }

    const getTodos = async () => {
        return await get<ITodo[]>('/todo');
    }

    const updateTodo = async (id: number, data: ITodoData) => {
        return await put<ITodo, ITodoData>(
            `/todo/${id}`,
            data,
        );
    }

    const removeTodo = async (id: number) => {
        return await remove<ITodo>(`/todo/${id}`);
    }

    const createTodo = async (data: ITodoData) => {
        return await post<ITodo, ITodoData>('/todo', data);
    }

    return {
        rest,
        getTodo,
        getTodos,
        createTodo,
        updateTodo,
        removeTodo,
    }
}
