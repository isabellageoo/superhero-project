import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './AppNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <AppNavigator />
            </PaperProvider>
        </SafeAreaProvider>
    );
}