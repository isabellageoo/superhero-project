import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
    Appbar,
    Card,
    Title,
    Paragraph,
    Button,
    Chip,
    Divider,
    ActivityIndicator,
    Snackbar,
} from 'react-native-paper';
import { servicoHeroi } from '../services/api';
import { HeroiExterno } from '../types/heroi';

const { width } = Dimensions.get('window');

type Props = StackScreenProps<any, 'DetalheHeroi'>;

const TelaDetalheHeroi: React.FC<Props> = ({ route, navigation }) => {
    const { heroiId } = route.params || { heroiId: 0 };
    const [heroi, setheroi] = useState<HeroiExterno | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);
    const [mensagemSnackbar, setMensagemSnackbar] = useState('');

    useEffect(() => {
        carregarHeroi();
    }, [heroiId]);

    const carregarHeroi = async () => {
        try {
            const resposta = await servicoHeroi.buscarHeroiPorId(heroiId);
            if (resposta.dados) {
                setheroi(resposta.dados);
            } else if (resposta.erro) {
                mostrarSnackbar(resposta.erro);
            }
        } catch (erro) {
            mostrarSnackbar('Erro ao carregar detalhes do herói');
        } finally {
            setCarregando(false);
        }
    };

    const mostrarSnackbar = (mensagem: string) => {
        setMensagemSnackbar(mensagem);
        setSnackbarVisivel(true);
    };

    if (carregando) {
        return (
            <View style={estilos.centralizado}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!heroi) {
        return (
            <View style={estilos.centralizado}>
                <Title>Herói não encontrado</Title>
                <Button onPress={() => navigation.goBack()}>
                    Voltar
                </Button>
            </View>
        );
    }
    return (
        <View style={estilos.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={heroi.nome} />
                <Appbar.Action
                    icon="heart"
                    onPress={() => navigation.navigate('Adicionar aos Favoritos', { heroiId })}
                />
            </Appbar.Header>

            <ScrollView contentContainerStyle={estilos.conteudo}>
                <Card style={estilos.cardImagem}>
                    <Image
                        source={{ uri: heroi.imagem.url }}
                        style={estilos.imagemGrande}
                        resizeMode="cover"
                    />
                </Card>

                <Card style={estilos.card}>
                    <Card.Content>
                        <Title style={estilos.tituloSecao}>Informações Básicas</Title>

                        <View style={estilos.linhaInfo}>
                            <Paragraph style={estilos.rotulo}>Nome completo:</Paragraph>
                            <Paragraph style={estilos.valor}>
                                {heroi.biografia['nomeCompleto'] || 'Não disponível'}
                            </Paragraph>
                        </View>

                        <View style={estilos.linhaInfo}>
                            <Paragraph style={estilos.rotulo}>Editora:</Paragraph>
                            <Paragraph style={estilos.valor}>{heroi.biografia.editora}</Paragraph>
                        </View>

                        <View style={estilos.linhaInfo}>
                            <Paragraph style={estilos.rotulo}>Alinhamento:</Paragraph>
                            <Chip
                                style={
                                    heroi.biografia.alinhamento === 'good'
                                        ? estilos.chipBom
                                        : estilos.chipMau
                                }
                            >
                                {heroi.biografia.alinhamento === 'good' ? 'Herói' : 'Vilão'}
                            </Chip>
                        </View>

                        <Divider style={estilos.divisor} />

                        <Title style={estilos.tituloSecao}>Estatísticas de Poder</Title>

                        <View style={estilos.gridEstatisticas}>
                            <View style={estilos.estatistica}>
                                <Paragraph style={estilos.rotuloEstatistica}>Força</Paragraph>
                                <Title style={estilos.valorEstatistica}>{heroi.estatisticasPoder.forca}</Title>
                            </View>

                            <View style={estilos.estatistica}>
                                <Paragraph style={estilos.rotuloEstatistica}>Inteligência</Paragraph>
                                <Title style={estilos.valorEstatistica}>{heroi.estatisticasPoder.inteligencia}</Title>
                            </View>

                            <View style={estilos.estatistica}>
                                <Paragraph style={estilos.rotuloEstatistica}>Velocidade</Paragraph>
                                <Title style={estilos.valorEstatistica}>{heroi.estatisticasPoder.velocidade}</Title>
                            </View>

                            <View style={estilos.estatistica}>
                                <Paragraph style={estilos.rotuloEstatistica}>Durabilidade</Paragraph>
                                <Title style={estilos.valorEstatistica}>{heroi.estatisticasPoder.durabilidade}</Title>
                            </View>

                            <View style={estilos.estatistica}>
                                <Paragraph style={estilos.rotuloEstatistica}>Poder</Paragraph>
                                <Title style={estilos.valorEstatistica}>{heroi.estatisticasPoder.poder}</Title>
                            </View>

                            <View style={estilos.estatistica}>
                                <Paragraph style={estilos.rotuloEstatistica}>Combate</Paragraph>
                                <Title style={estilos.valorEstatistica}>{heroi.estatisticasPoder.combate}</Title>
                            </View>
                        </View>

                        <Divider style={estilos.divisor} />

                        <Title style={estilos.tituloSecao}>Biografia</Title>

                        <View style={estilos.linhaInfo}>
                            <Paragraph style={estilos.rotulo}>Local de nascimento:</Paragraph>
                            <Paragraph style={estilos.valor}>
                                {heroi.biografia['localDeNascimento'] || 'Não disponível'}
                            </Paragraph>
                        </View>

                        <View style={estilos.linhaInfo}>
                            <Paragraph style={estilos.rotulo}>Primeira aparição:</Paragraph>
                            <Paragraph style={estilos.valor}>
                                {heroi.biografia['primeiraAparicao'] || 'Não disponível'}
                            </Paragraph>
                        </View>

                        <View style={estilos.botoesContainer}>
                            <Button
                                mode="contained"
                                icon="heart"
                                onPress={() => navigation.navigate('Adicionar aos Favoritos', { heroiId })}
                                style={estilos.botaoPrincipal}
                            >
                                Adicionar aos Favoritos
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
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
        backgroundColor: '#f5f5f5',
    },
    centralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    conteudo: {
        paddingBottom: 20,
    },
    cardImagem: {
        margin: 16,
        elevation: 4,
    },
    imagemGrande: {
        width: '100%',
        height: 300,
        borderRadius: 8,
    },
    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        elevation: 2,
    },
    tituloSecao: {
        fontSize: 18,
        marginBottom: 16,
        color: '#6200ee',
    },
    linhaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    rotulo: {
        fontWeight: 'bold',
        color: '#666',
        flex: 1,
    },
    valor: {
        flex: 2,
        textAlign: 'right',
    },
    chipBom: {
        backgroundColor: '#d4edda',
    },
    chipMau: {
        backgroundColor: '#f8d7da',
    },
    divisor: {
        marginVertical: 20,
    },
    gridEstatisticas: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    estatistica: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    rotuloEstatistica: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    valorEstatistica: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6200ee',
    },
    botoesContainer: {
        marginTop: 24,
    },
    botaoPrincipal: {
        backgroundColor: '#6200ee',
        paddingVertical: 8,
    },
});

export default TelaDetalheHeroi;