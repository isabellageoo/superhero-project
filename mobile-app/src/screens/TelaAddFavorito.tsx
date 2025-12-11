import React, { useState, useEffect } from 'react';
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
  Paragraph,
  ActivityIndicator,
  Snackbar,
  Card,
} from 'react-native-paper';
import { servicoHeroi } from '../services/api';

type Props = StackScreenProps<any, 'Adicionar aos Favoritos'>;

const TelaAddFavorito: React.FC<Props> = ({ route, navigation }) => {
  const { heroiId } = route.params || { heroiId: 0 };
  const [notas, setnotas] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [carregandoHeroi, setCarregandoHeroi] = useState(true);
  const [snackbarVisivel, setSnackbarVisivel] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');
  const [nomeHeroi, setNomeHeroi] = useState('');

  useEffect(() => {
    carregarDetalhesHeroi();
  }, [heroiId]);

  const carregarDetalhesHeroi = async () => {
    try {
      const resposta = await servicoHeroi.buscarHeroiPorId(heroiId);
      if (resposta.dados) {
        setNomeHeroi(resposta.dados.nome);
      }
    } catch (erro) {
      console.error('Erro ao carregar herói:', erro);
    } finally {
      setCarregandoHeroi(false);
    }
  };

  const manipularAdicionarFavorito = async () => {
    setCarregando(true);

    const resposta = await servicoHeroi.adicionarFavoritos(heroiId, notas);

    if (resposta.erro) {
      mostrarSnackbar(resposta.erro);
    } else {
      mostrarSnackbar('Herói adicionado aos favoritos com sucesso!');
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

  if (carregandoHeroi) {
    return (
      <View style={estilos.centralizado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar aos Favoritos" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Card style={estilos.card}>
          <Card.Content>
            <Title style={estilos.titulo}>
              Adicionar {nomeHeroi} aos favoritos
            </Title>

            <Paragraph style={estilos.descricao}>
              Adicione este herói à sua lista de favoritos. Você pode incluir notas pessoais sobre ele.
            </Paragraph>

            <TextInput
              label="Suas notas sobre este herói"
              value={notas}
              onChangeText={setnotas}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={estilos.entradaTexto}
              disabled={carregando}
              placeholder="Ex: Este é meu herói favorito porque..."
            />

            <View style={estilos.botoesContainer}>
              <Button
                mode="contained"
                icon="heart"
                onPress={manipularAdicionarFavorito}
                style={estilos.botaoAdicionar}
                loading={carregando}
                disabled={carregando}
              >
                Adicionar aos Favoritos
              </Button>

              <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={estilos.botaoCancelar}
                disabled={carregando}
              >
                Cancelar
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
    padding: 16,
  },
  card: {
    elevation: 4,
  },
  titulo: {
    marginBottom: 16,
    textAlign: 'center',
  },
  descricao: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  entradaTexto: {
    marginBottom: 24,
  },
  botoesContainer: {
    gap: 12,
  },
  botaoAdicionar: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
  },
  botaoCancelar: {
    paddingVertical: 8,
  },
});

export default TelaAddFavorito;