import { FC } from 'react';
import { ICategory } from '../../types';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';
import { DeleteIcon } from '../icons';
import { COLORS } from '../../utils/colors';

export interface ICategoryInfoProps {
    onClick: () => void;
    onDelete: () => void;
    category: ICategory;
}

export const CategoryInfo: FC<ICategoryInfoProps> = ({ category, onClick, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClick}>
                <View style={styles.block}>
                    <View style={styles.texts}>
                        <Text style={styles.value}>label:</Text>
                        <Text style={styles.text}>{category.label}</Text>
                    </View>
                    <View style={styles.texts}>
                        <Text style={styles.value}>value:</Text>
                        <Text style={styles.text}>{category.value}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <DeleteIcon fill={COLORS.lightRed} />
            </TouchableOpacity>
        </View>
    );
}
