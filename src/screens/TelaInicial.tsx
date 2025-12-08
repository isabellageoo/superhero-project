import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import {
    Appbar,
    Card,
    Title,
    Paragraph,
    Button,
    FAB,
    ActivityIndicator,
    Snackbar,
    Chip,
    Avatar,
} from 'react-native-paper';
import { servicoHeroi } from '../services/api';
import { HeroiFavorito } from '../types/heroi';

type Props = StackScreenProps<any, 'Inicial'>;

const TelaInicial: React.FC<Props> = ({ navigation }) => {
    const [favoritos, setFavoritos] = useState<HeroiFavorito[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);
    const [mensagemSnackbar, setMensagemSnackbar] = useState('');

    const carregarFavoritos = async () => {
        try {
            const resposta = await servicoHeroi.buscarFavoritos();
            if (resposta.dados) {
                setFavoritos(resposta.dados);
            } else if (resposta.erro) {
                mostrarSnackbar(resposta.erro);
            }
        } catch (erro) {
            mostrarSnackbar('Erro ao carregar favoritos');
        } finally {
            setCarregando(false);
            setAtualizando(false);
        }
    };

    const manipularRemoverFavorito = async (id: string) => {
        const resposta = await servicoHeroi.removerDosFavoritos(id);
        if (!resposta.erro) {
            setFavoritos(favoritos.filter(heroi => heroi._id !== id));
            mostrarSnackbar('Herói removido dos favoritos');
        } else {
            mostrarSnackbar(resposta.erro);
        }
    };

    const mostrarSnackbar = (mensagem: string) => {
        setMensagemSnackbar(mensagem);
        setSnackbarVisivel(true);
    };

    const aoAtualizar = () => {
        setAtualizando(true);
        setSnackbarVisivel(true);
    };

    useEffect(() => {
        carregarFavoritos();
    }, []);

    const renderizarItemHeroi = ({ item }: { item: HeroiFavorito }) => (
        <Card style={estilos.card}>
            <TouchableOpacity onPress={() => navigation.navigate('EditarNotas', { heroiId: item._id, notas: item.notas })}>
                <Card.Content style={estilos.conteudoCard}>
                    <Image
                        source={{ uri: item.imagem.url }}
                        style={estilos.imagemHeroi}
                        resizeMode="cover"
                    />
                    <View style={estilos.infoHeroi}>
                        <Title style={estilos.nomeHeroi}>{item.nome}</Title>
                        <Paragraph numberOfLines={2}>
                            {item.notas || 'Sem notas adicionadas'}
                        </Paragraph>
                        <View style={estilos.containerEstatisticas}>
                            <Chip icon="arm-flex" style={estilos.chipEstatistica}>
                                Força: {item.estatisticasPoder.forca}
                            </Chip>
                            <Chip icon="brain" style={estilos.chipEstatistica}>
                                Inteligência: {item.estatisticasPoder.inteligencia}
                            </Chip>
                        </View>
                        <Paragraph style={estilos.textoData}>
                            Adicionado em: {new Date(item.criadoEm).toLocaleDateString('pt-BR')}
                        </Paragraph>
                    </View>
                </Card.Content>
            </TouchableOpacity>
            <Card.Actions>
                <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('EditarNotas', { heroiId: item._id, notas: item.notas })}
                >
                    Editar Notas
                </Button>
                <Button
                    mode="contained"
                    style={estilos.botaoRemover}
                    onPress={() => manipularRemoverFavorito(item._id)}
                >
                    Remover
                </Button>
            </Card.Actions>
        </Card>
    );

    if (carregando) {
        return (
            <View style={estilos.centralizado}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={estilos.container}>
            <Appbar.Header>
                <Appbar.Content title="Meus Heróis Favoritos" />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Buscar')} />
                <Appbar.Action icon="refresh" onPress={carregarFavoritos} />
            </Appbar.Header>

            <FlatList
                data={favoritos}
                renderItem={renderizarItemHeroi}
                keyExtractor={(item) => item._id}
                contentContainerStyle={estilos.lista}
                refreshControl={
                    <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} />
                }
                ListEmptyComponent={
                    <View style={estilos.containerVazio}>
                        <Avatar.Icon
                            size={80}
                            icon="emoticon-sad"
                            style={estilos.iconeVazio}
                        />
                        <Title style={estilos.tituloVazio}>
                            Nenhum herói favorito
                        </Title>
                        <Paragraph style={estilos.textoVazio}>
                            Adicione heróis aos favoritos para vê-los aqui
                        </Paragraph>
                        <Button
                            mode="contained"
                            icon="magnify"
                            onPress={() => navigation.navigate('Buscar')}
                            style={estilos.botaoVazio}
                        >
                            Buscar Heróis
                        </Button>
                    </View>
                }
            />

            <FAB
                style={estilos.fab}
                icon="magnify"
                onPress={() => navigation.navigate('Buscar')}
                label="Buscar Heróis"
            />

            <Snackbar
                visible={snackbarVisivel}
                onDismiss={() => setSnackbarVisivel(false)}
                duration={3000}
                action={{
                    label: 'OK',
                    onPress: () => setSnackbarVisivel(false),
                }}
            >
                {mensagemSnackbar}
            </Snackbar>
        </View>
    );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lista: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        elevation: 3,
    },
    conteudoCard: {
        flexDirection: 'row',
    },
    imagemHeroi: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    infoHeroi: {
        flex: 1,
    },
    nomeHeroi: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    containerEstatisticas: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 8,
    },
    chipEstatistica: {
        backgroundColor: '#e3f2fd',
    },
    textoData: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
    },
    botaoRemover: {
        backgroundColor: '#dc3545',
    },
    containerVazio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        marginTop: 50,
    },
    iconeVazio: {
        backgroundColor: '#e0e0e0',
        marginBottom: 16,
    },
    tituloVazio: {
        textAlign: 'center',
        marginBottom: 8,
    },
    textoVazio: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 24,
    },
    botaoVazio: {
        marginTop: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
    },
});

export default TelaInicial;