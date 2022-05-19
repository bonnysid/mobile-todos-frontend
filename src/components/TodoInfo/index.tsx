import { FC } from 'react';
import { ITodo } from '../../types';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';
import { CompleteIcon, DeleteIcon } from '../../components/icons';
import { COLORS } from '../../utils/colors';
import { CategoryLabel } from '../../components/CategoryLabel';

export interface ITodoInfoProps {
    onClick: () => void;
    onDelete: () => void;
    onToggleComplete: () => void;
    isCompleted: boolean;
    todo: ITodo;
}

export const TodoInfo: FC<ITodoInfoProps> = ({ todo, onClick, onDelete, onToggleComplete, isCompleted }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClick}>
                <View style={styles.block}>
                    <Text style={styles.title}>{todo.title}</Text>
                    <Text style={styles.text}>{todo.description}</Text>
                    <View style={styles.categories}>
                        {todo.categories.map(it => (
                            <CategoryLabel text={it.label} />
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.rowBlock}>
                <TouchableOpacity onPress={onDelete}>
                    <DeleteIcon fill={COLORS.lightRed} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onToggleComplete}>
                    <CompleteIcon fill={isCompleted ? COLORS.green : COLORS.whiteDark} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
