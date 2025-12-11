import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
    Appbar,
    TextInput,
    Button,
    Title,
    Snackbar,
    ActivityIndicator,
} from 'react-native-paper';
import { servicoHeroi } from '../services/api';

type Props = StackScreenProps<any, 'EditarNotas'>;

const TelaEditarNotas: React.FC<Props> = ({ route, navigation }) => {
    const { heroiId, notas: anotacoesIniciais } = route.params || { heroiId: '', notas: '' };
    const [notas, setNotas] = useState(anotacoesIniciais || '');
    const [carregando, setCarregando] = useState(false);
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);
    const [mensagemSnackbar, setMensagemSnackbar] = useState('');

    const manipularSalvar = async () => {
        setCarregando(true);

        const resposta = await servicoHeroi.atualizarNotas(heroiId, notas);

        if (resposta.erro) {
            mostrarSnackbar(resposta.erro);
        } else {
            mostrarSnackbar('Anotações atualizadas com sucesso!');
            setTimeout(() => {
                navigation.goBack();
            }, 1500);
        }

        setCarregando(false);
    };

    const mostrarSnackbar = (mensagem: string) => {
        setMensagemSnackbar(mensagem);
        setSnackbarVisivel(true);
    };

    return (
        <View style={estilos.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Editar Anotações" />
            </Appbar.Header>

            <ScrollView contentContainerStyle={estilos.conteudo}>
                <Title style={estilos.titulo}>
                    Adicione ou edite suas anotações sobre este herói
                </Title>

                <TextInput
                    label="Suas notas"
                    value={notas}
                    onChangeText={setNotas}
                    mode="outlined"
                    multiline
                    numberOfLines={8}
                    style={estilos.areaTexto}
                    disabled={carregando}
                    placeholder="Ex: Este é meu herói favorito porque..."
                />

                <Button
                    mode="contained"
                    onPress={manipularSalvar}
                    style={estilos.botao}
                    loading={carregando}
                    disabled={carregando}
                >
                    Salvar Notas
                </Button>

                <Button
                    mode="outlined"
                    onPress={() => navigation.goBack()}
                    style={estilos.botao}
                    disabled={carregando}
                >
                    Cancelar
                </Button>
            </ScrollView>

            <Snackbar
                visible={snackbarVisivel}
                onDismiss={() => setSnackbarVisivel(false)}
                duration={3000}
            >
                {mensagemSnackbar}
            </Snackbar>
        </View>
    );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    conteudo: {
        padding: 16,
    },
    titulo: {
        marginBottom: 24,
        textAlign: 'center',
    },
    areaTexto: {
        marginBottom: 24,
        height: 200,
        textAlignVertical: 'top',
    },
    botao: {
        marginBottom: 12,
        paddingVertical: 8,
    },
});

export default TelaEditarNotas;