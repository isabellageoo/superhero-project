import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/screens/TelaInicial';
import TelaBusca from './src/screens/TelaBusca';
import TelaDetalheHeroi from './src/screens/TelaDetalheHeroi';
import TelaAddFavorito from './src/screens/TelaAddFavorito';
import TelaEditarNotas from './src/screens/TelaEditarNotas';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                id="RootNavigator"
                initialRouteName="Inicial"
            >
                <Stack.Screen
                    name="Inicial"
                    component={TelaInicial}
                    options={{ title: 'Meus Heróis Favoritos' }}
                />
                <Stack.Screen
                    name="Busca"
                    component={TelaBusca}
                    options={{ title: 'Buscar Heróis' }}
                />
                <Stack.Screen
                    name="DetalheHeroi"
                    component={TelaDetalheHeroi}
                    options={{ title: 'Detalhes do Herói' }}
                />
                <Stack.Screen
                    name="Adicionar aos Favoritos"
                    component={TelaAddFavorito}
                    options={{ title: 'Adicionar aos Favoritos' }}
                />
                <Stack.Screen
                    name="EditarNotas"
                    component={TelaEditarNotas}
                    options={{ title: 'Editar Notas' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
