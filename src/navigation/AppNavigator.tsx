import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from '../screens/TelaInicial';
import TelaBusca from '../screens/TelaBusca';
import TelaDetalheHeroi from '../screens/TelaDetalheHeroi';
import TelaAddFavorito from '../screens/TelaAddFavorito';
import TelaEditarNotas from '../screens/TelaEditarNotas';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicial">
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