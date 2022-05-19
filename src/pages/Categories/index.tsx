import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from './styles';
import { Button, ButtonType, CategoryInfo, Navbar } from '../../components';
import { Routes } from '../../router/routes';
import { useRouter } from '../../router/useRouter';
import { ICategory } from '../../types';
import { useCategory } from '../../api';

export const Categories: FC = () => {
    const { goTo } = useRouter();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { getCategories, removeCategory } = useCategory();

    const loadCategories = async () => {
        setCategories(await getCategories() || []);
    }

    useEffect(() => {
        loadCategories()
    }, []);

    const handleRemove = useCallback(async (id: number) => {
        await removeCategory(id);
        await loadCategories();
    }, [])

    const renderedContent = useMemo(() => {
        if (categories.length) {
            return categories.map(category => (
                <CategoryInfo
                    category={category}
                    onClick={() => goTo(Routes.CATEGORY, { categoryId: category.id })}
                    onDelete={() => handleRemove(category.id)}
                />
            ));
        }

        return (
            <View style={styles.emptyCategories}>
                <Text style={styles.emptyCategoriesText}>You don't have categories!</Text>
            </View>
        )
    }, [categories])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Navbar />
                <Button
                    mt={20}
                    type={ButtonType.AGREE}
                    onClick={() => goTo(Routes.CATEGORY, { isNewCategory: true })}
                    text={'Add new category'}
                />
                {renderedContent}
            </View>
        </SafeAreaView>
    );
}
