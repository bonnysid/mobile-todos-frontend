import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../utils/colors';

interface IProps {
    text: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const CategoryLabel: FC<IProps> = ({ text, onClick, isActive }) => {
    return (
        <TouchableOpacity onPress={onClick} disabled={!onClick}>
            <View style={{ ...styles.container, ...(isActive ? styles.active : {}) }}>
                <Text style={{...styles.text, ...(isActive ? styles.activeText : {})}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.purple,
        borderRadius: 5,
        marginRight: 5,
    },

    active: {
        backgroundColor: COLORS.purpleDark,
    },
    activeText: {
        color: COLORS.whiteLight,
    },
    text: {
        fontSize: 15,
        color: COLORS.purpleDark,
        fontWeight: '500',
    }
});
