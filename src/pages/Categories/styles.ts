import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.gray,
    },
    wrapper: {
        paddingRight: 20,
        paddingLeft: 20,
        width: '100%',
        height: '100%',
    },
    emptyCategories: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyCategoriesText: {
        fontSize: 20,
        color: COLORS.whiteLight,
    },
});
