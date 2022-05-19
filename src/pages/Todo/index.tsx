import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from './styles';
import { Button, ButtonType, CategoryLabel, Input, InputScheme, Navbar } from '../../components';
import { useRouter } from '../../router/useRouter';
import { useCategory, useTodo } from '../../api';
import { ICategory, ITodo } from '../../types';
import { Routes } from '../../router/routes';

const initTodo: ITodo = {
    id: 1,
    title: '',
    categories: [],
    completed: false,
    description: '',
    userId: 1,
}

export const Todo: FC = () => {
    const { data, goTo } = useRouter();
    const { createTodo, updateTodo, getTodo } = useTodo();
    const { getCategories } = useCategory();
    const [todo, setTodo] = useState<ITodo>({ ...initTodo });
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    useEffect(() => {
        if (!data.isNewTodo) {
            loadTodo();
        }
        loadCategories();
    }, []);

    useEffect(() => {
        setSelectedCategories(todo.categories.map(it => it.id));
    }, [todo]);


    const loadTodo = async () => {
        const newTodo = await getTodo(data.todoId as number) || { ...initTodo };
        setTodo(newTodo);
    };

    const loadCategories = async () => {
        const categories = await getCategories() || [];
        setCategories(categories);
    };

    const addCategory = (id: number) => {
        if (!selectedCategories.includes(id)) {
            setSelectedCategories(prev => [...prev, id]);
        }
    }

    const removeCategory = (id: number) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(prev => prev.filter(it => it !== id));
        }
    }

    const handleChangeTitle = useCallback((value: string) => {
        setTodo(prev => ({ ...prev, title: value }));
    }, []);

    const handleChangeDescription = useCallback((value: string) => {
        setTodo(prev => ({ ...prev, description: value }));
    }, []);

    const handleClick = useCallback(async () => {
        if (todo.title && todo.description) {
            if (data.isNewTodo) {
                await createTodo({ ...todo, categories: selectedCategories});
                goTo(Routes.MAIN);
            } else {
                await updateTodo(todo.id, { ...todo, categories: selectedCategories});
                goTo(Routes.MAIN);
            }
        }
    }, [todo, data, selectedCategories]);

    const renderedSelectedCategories = useMemo(() => {
        const needCategories = categories.filter(it => selectedCategories.includes(it.id));
        return needCategories.map(it => (
            <CategoryLabel text={it.label} onClick={() => removeCategory(it.id)} />
        ));
    }, [categories, selectedCategories, todo]);

    const renderedUnelectedCategories = useMemo(() => {
        const needCategories = categories.filter(it => !selectedCategories.includes(it.id));
        return needCategories.map(it => (
            <CategoryLabel text={it.label} onClick={() => addCategory(it.id)} />
        ));
    }, [categories, selectedCategories, todo]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Navbar />
                <View style={styles.content}>
                    <Input marginBottom={20} scheme={InputScheme.DARK} value={todo.title} onChange={handleChangeTitle} label={'Title'} />
                    <Input marginBottom={20} scheme={InputScheme.DARK} value={todo.description} onChange={handleChangeDescription} label={'Description'} />
                    <View style={styles.categories}>
                        <Text style={styles.label}>Categories</Text>
                        <View style={styles.unselectedCategories}>
                            {renderedUnelectedCategories}
                        </View>
                        <View style={styles.selectedCategories}>
                            {renderedSelectedCategories}
                        </View>
                    </View>
                    <Button
                        text={data.isNewTodo ? 'Create' : 'Update'}
                        onClick={handleClick}
                        type={ButtonType.AGREE}
                        disabled={!todo.title || !todo.description}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
