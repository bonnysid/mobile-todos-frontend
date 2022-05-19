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

    content: {
        display: 'flex',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: COLORS.grayLight,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
    }
});
