import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Button, ButtonType, CategoryLabel, Navbar, TodoInfo } from '../../components';
import { useCategory, useTodo } from '../../api';
import { ICategory, ITodo } from '../../types';
import { useRouter } from '../../router/useRouter';
import { Routes } from '../../router/routes';

const contains = (where: number[], what: number[]) => {
    for(let i = 0; i < what.length; i++){
        if(where.indexOf(what[i]) !== -1) return true;
    }
    return false;
}

export const Main: FC = () => {
    const { goTo } = useRouter();
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [onlyCompleted, setOnlyCompleted] = useState(false);
    const { getTodos, removeTodo, updateTodo } = useTodo();
    const { getCategories } = useCategory();

    const loadTodos = async () => {
        setTodos(await getTodos() || []);
    }

    const loadCategories = async () => {
        setCategories(await getCategories() || []);
    }

    const toggleSelectCategory = useCallback((id: number) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(prev => prev.filter(it => it !== id));
        } else {
            setSelectedCategories(prev => [...prev, id]);
        }
    }, [selectedCategories])

    useEffect(() => {
        loadTodos();
        loadCategories();
    }, []);

    const renderedContent = useMemo(() => {
        let filteredTodos: ITodo[] = todos;
        if (selectedCategories.length) {
            filteredTodos = todos.filter(it => contains(it.categories.map(it => it.id), selectedCategories));
        }
        if (onlyCompleted) {
            filteredTodos = todos.filter(it => it.completed);
        }
        if (todos.length) {
            return filteredTodos.map(todo => (
                <TodoInfo
                    onClick={() => goTo(Routes.TODO, { todoId: todo.id })}
                    todo={todo}
                    onDelete={async () => {
                        await removeTodo(todo.id)
                        await loadTodos();
                    }}
                    onToggleComplete={async () => {
                        await updateTodo(todo.id, { ...todo, completed: !todo.completed, categories: todo.categories.map(it => it.id) })
                        await loadTodos();
                    }}
                    isCompleted={todo.completed}
                />
            ));
        }

        return (
            <View style={styles.emptyTodos}>
                <Text style={styles.emptyTodosText}>You don't have todos!</Text>
            </View>
        )
    }, [todos, selectedCategories, onlyCompleted])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Navbar />
                <View style={styles.filters}>
                    <TouchableOpacity onPress={() => setOnlyCompleted(prev => !prev)}>
                        <View style={{ ...styles.completedContainer, ...(onlyCompleted ? styles.completedActive : {}) }}>
                            <Text style={{ ...styles.completedText, ...(onlyCompleted ? styles.completedActiveText : {}) }}>completed</Text>
                        </View>
                    </TouchableOpacity>
                    {categories.map(it => (
                        <CategoryLabel text={it.label} onClick={() => toggleSelectCategory(it.id)} isActive={selectedCategories.includes(it.id)} />
                    ))}
                </View>
                <Button
                    mt={20}
                    type={ButtonType.AGREE}
                    onClick={() => goTo(Routes.TODO, { isNewTodo: true })}
                    text={'Add new todo'}
                />
                {renderedContent}
            </View>
        </SafeAreaView>
    );
}
