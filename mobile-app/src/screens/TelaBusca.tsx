import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
    Appbar,
    Searchbar,
    Card,
    Title,
    Paragraph,
    Button,
    Chip,
    ActivityIndicator,
    Snackbar,
} from 'react-native-paper';
import { servicoHeroi } from '../services/api';
import { HeroiExterno } from '../types/heroi';

type Props = StackScreenProps<any, 'Busca'>;

const TelaBusca: React.FC<Props> = ({ navigation }) => {
    const [consultaBusca, setConsultaBusca] = useState('');
    const [herois, setHerois] = useState<HeroiExterno[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [snackbarVisivel, setSnackbarVisivel] = useState(false);
    const [mensagemSnackbar, setMensagemSnackbar] = useState('');

    const buscaHerois = async () => {
        if (!consultaBusca.trim()) return;

        setCarregando(true);
        setHerois([]);

        const resposta = await servicoHeroi.buscarHerois(consultaBusca);

        if (resposta.dados) {
            setHerois(resposta.dados);
        } else if (resposta.erro) {
            mostrarSnackbar(resposta.erro);
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
                <Appbar.Content title="Buscar Heróis" />
            </Appbar.Header>

            <View style={estilos.containerBusca}>
                <Searchbar
                    placeholder="Buscar herói (ex: Homem-Aranha, Batman)"
                    value={consultaBusca}
                    onChangeText={setConsultaBusca}
                    onSubmitEditing={buscaHerois}
                    style={estilos.barraBusca}
                />
                <Button
                    mode="contained"
                    onPress={buscaHerois}
                    loading={carregando}
                    disabled={carregando}
                    style={estilos.botaoBusca}
                >
                    Buscar
                </Button>
            </View>
            {carregando ? (
                <View style={estilos.centralizado}>
                    <ActivityIndicator size="large" />
                    <Paragraph style={estilos.textoCarregando}>Buscando heróis...</Paragraph>
                </View>
            ) : (
                <FlatList
                    data={herois}
                    renderItem={({ item }) => (
                        <Card style={estilos.card}>
                            <TouchableOpacity onPress={() => navigation.navigate('DetalheHeroi', { heroiId: item.id })}>
                                <Card.Content style={estilos.conteudoCard}>
                                    <Image
                                        source={{ uri: item.imagem.url }}
                                        style={estilos.imagemHeroi}
                                        resizeMode="cover"
                                    />
                                    <View style={estilos.infoHeroi}>
                                        <Title style={estilos.nomeHeroi}>{item.nome}</Title>
                                        <Paragraph numberOfLines={2}>
                                            {item.biografia['nomeCompleto'] || 'Nome completo não disponível'}
                                        </Paragraph>
                                        <View style={estilos.containerChips}>
                                            <Chip icon="account" style={estilos.chip}>
                                                {item.biografia.editora}
                                            </Chip>
                                            <Chip icon={item.biografia.alinhamento === 'good' ? 'shield' : 'skull'}
                                                style={item.biografia.alinhamento === 'good'
                                                    ? estilos.chipBom
                                                    : estilos.chipMau
                                                }>
                                                {item.biografia.alinhamento === 'good' ? 'Herói' : 'Vilão'}
                                            </Chip>
                                        </View>
                                        <View style={estilos.estatisticasPoder}>
                                            <Paragraph style={estilos.estatisticaPoder}>
                                                {item.estatisticasPoder.forca}
                                            </Paragraph>
                                            <Paragraph style={estilos.estatisticaPoder}>
                                                {item.estatisticasPoder.inteligencia}
                                            </Paragraph>
                                            <Paragraph style={estilos.estatisticaPoder}>
                                                {item.estatisticasPoder.velocidade}
                                            </Paragraph>
                                        </View>
                                    </View>
                                </Card.Content>
                            </TouchableOpacity>

                            <Card.Actions>
                                <Button
                                    onPress={() => navigation.navigate('DetalheHeroi', { heroiId: item.id })}
                                >
                                    Ver Detalhes
                                </Button>

                                <Button
                                    mode="contained"
                                    onPress={() => navigation.navigate('AddAosFavoritos', { heroiId: item.id })}
                                >
                                    Favoritar
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={estilos.lista}
                    ListEmptyComponent={
                        <View style={estilos.containerVazio}>
                            <Paragraph style={estilos.textoVazio}>
                                {consultaBusca
                                    ? 'Nenhum herói encontrado'
                                    : 'Digite o nome de um herói para buscar'}
                            </Paragraph>
                        </View>
                    } />
            )}

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
    containerBusca: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    barraBusca: {
        flex: 1,
        marginRight: 8,
    },
    botaoBusca: {
        height: 56,
        justifyContent: 'center',
    },
    centralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoCarregando: {
        marginTop: 16,
        color: '#666',
    },
    lista: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
    conteudoCard: {
        flexDirection: 'row',
    },
    imagemHeroi: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    infoHeroi: {
        flex: 1,
    },
    nomeHeroi: {
        fontSize: 18,
        marginBottom: 4,
    },
    containerChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 8,
    },
    chip: {
        marginRight: 8,
        marginBottom: 8,
    },
    chipBom: {
        backgroundColor: '#d4edda',
    },
    chipMau: {
        backgroundColor: '#f8d7da',
    },
    estatisticasPoder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    estatisticaPoder: {
        fontSize: 12,
        color: '#666',
    },
    containerVazio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    textoVazio: {
        textAlign: 'center',
        color: '#666',
    },
});

export default TelaBusca;