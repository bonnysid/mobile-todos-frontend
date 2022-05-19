import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.grayLight,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'space-between',
    },
    block: {
        padding: 10,
        flexDirection: 'column',
    },
    rowBlock: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: COLORS.white,
    },
    title: {
        fontSize: 20,
        color: COLORS.whiteLight,
    },
    categories: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 5
    }
});
