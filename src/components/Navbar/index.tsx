import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styled';
import { AddIcon, CategoriesIcon, HomeIcon, LogoutIcon } from '../../components';
import { COLORS } from '../../utils/colors';
import { useAuth } from '../../providers';
import { NavItem } from './NavItem';
import { useRouter } from '../../router/useRouter';
import { Routes } from '../../router/routes';

export interface INavbarProps {

}

export const Navbar: FC<INavbarProps> = () => {
    const { goTo, currentPage } = useRouter();
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <NavItem
                    onClick={() => goTo(Routes.MAIN)}
                    icon={<HomeIcon fill={currentPage === Routes.MAIN ? COLORS.whiteLight : COLORS.white} />}
                    text={'Home'}
                    isActive={currentPage === Routes.MAIN}
                />
                <NavItem
                    onClick={() => goTo(Routes.CATEGORIES)}
                    icon={<CategoriesIcon fill={currentPage === Routes.CATEGORIES ? COLORS.whiteLight : COLORS.white} />}
                    text={'Categories'}
                    isActive={currentPage === Routes.CATEGORIES}
                />
            </View>
            <View style={styles.block}>
                <TouchableOpacity onPress={logout}>
                    <LogoutIcon fill={COLORS.lightRed} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
