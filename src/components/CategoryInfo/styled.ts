import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.grayLight,
        marginTop: 20,
        paddingRight: 10,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    texts: {
        flexDirection: 'row',
        marginTop: 2,
    },
    block: {
        padding: 10,
        flexDirection: 'column',
    },
    text: {
        fontSize: 18,
        marginLeft: 5,
        color: COLORS.whiteLight,
    },
    value: {
        fontSize: 18,
        color: COLORS.orange,
    },
});
