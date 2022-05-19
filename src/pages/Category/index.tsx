import { FC, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { styles } from './styles';
import { Button, ButtonType, Input, InputScheme, Navbar } from '../../components';
import { useCategory } from '../../api';
import { useRouter } from '../../router/useRouter';
import { ICategory } from '../../types';
import { Routes } from '../../router/routes';

const initCategory: ICategory = {
    label: '',
    value: '',
    userId: 1,
    id: 1,
}

export const Category: FC = () => {
    const { data, goTo } = useRouter();
    const { createCategory, updateCategory, getCategory } = useCategory();
    const [category, setCategory] = useState<ICategory>({ ...initCategory });

    useEffect(() => {
        if (!data.isNewCategory) {
            loadCategory();
        }
    }, []);

    const loadCategory = async () => {
        setCategory(await getCategory(data.categoryId as number) || { ...initCategory });
    };

    const handleChangeValue = useCallback((value: string) => {
        setCategory(prev => ({ ...prev, value }));
    }, []);

    const handleChangeLabel = useCallback((value: string) => {
        setCategory(prev => ({ ...prev, label: value }));
    }, []);

    const handleClick = useCallback(async () => {
        if (category.value && category.label) {
            if (data.isNewCategory) {
                await createCategory(category);
                goTo(Routes.CATEGORIES)
            } else {
                await updateCategory(category.id, category);
                goTo(Routes.CATEGORIES)
            }
        }
    }, [category]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Navbar />
                <View style={styles.content}>
                    <Input marginBottom={20} scheme={InputScheme.DARK} value={category.label} onChange={handleChangeLabel} label={'Label'} />
                    <Input marginBottom={20} scheme={InputScheme.DARK} value={category.value} onChange={handleChangeValue} label={'Value'} />
                    <Button
                        text={data.isNewCategory ? 'Create' : 'Update'}
                        onClick={handleClick}
                        type={ButtonType.AGREE}
                        disabled={!category.value || !category.label}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
