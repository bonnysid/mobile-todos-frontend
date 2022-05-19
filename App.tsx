import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Router } from './src/router/Router';
import { RouterProvider } from './src/router/RouterProvider';
import { Routes } from './src/router/routes';
import { AuthProvider, NotificationProvider } from './src/providers';

export default function App() {
    return (
        <View>
            <AuthProvider>
                <NotificationProvider>
                    <RouterProvider initialPage={Routes.LOGIN}>
                        <Router/>
                    </RouterProvider>
                </NotificationProvider>
            </AuthProvider>
        </View>
    );
}
