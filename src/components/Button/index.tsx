import { FC } from 'react';
import { styles, ButtonType } from './styled';
import { Text, TouchableOpacity, View } from 'react-native';

export interface IButtonProps {
    text: string;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
    disabled?: boolean;
    type?: ButtonType;
    onClick: () => void;
}

export const Button: FC<IButtonProps> = ({
                                             disabled,
                                             onClick,
                                             text,
                                             mt = 0,
                                             mr = 0,
                                             mb = 0,
                                             ml = 0,
                                             type = ButtonType.DEFAULT,
                                         }) => {
    return (
        <TouchableOpacity onPress={onClick} disabled={disabled}>
            <View style={{
                ...styles.container,
                ...styles[type],
                marginTop: mt,
                marginBottom: mb,
                marginLeft: ml,
                marginRight: mr,
                ...(disabled ? styles.disabled : {}),
            }}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
