import axios from 'axios';
import { HeroiExterno, HeroiFavorito } from '../types/heroi';

const URL_BASE = 'http://192.168.1.15:27017';

const api = axios.create({
    baseURL: URL_BASE + '/api',
    timeout: 10000,
});

export interface RespostaApi {
    dados?: any;
    erro?: string;
}

export const servicoHeroi = {
    buscarHerois: async (nome: string): Promise<RespostaApi> => {
        try {
            const resposta = await api.get('/herois/buscar', { params: { nome } });
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: 'Falha na conexão' };
        }
    },

    buscarHeroiPorId: async (id: number): Promise<RespostaApi> => {
        try {
            const resposta = await api.get('/herois/externo/' + id);
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: 'Falha na conexão' };
        }
    },

    buscarFavoritos: async (): Promise<RespostaApi> => {
        try {
            const resposta = await api.get('/herois/favoritos');
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: 'Falha na conexão' };
        }
    },

    adicionarFavoritos: async (heroiId: number, notas?: string): Promise<RespostaApi> => {
        try {
            const resposta = await api.post('/herois/favoritos', { heroiId, notas });
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: 'Falha na conecão' };
        }
    },

    atualizarNotas: async (id: string, notas: string): Promise<RespostaApi> => {
        try {
            const resposta = await api.put('/herois/favoritos/' + id + '/notas', { notas });
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: 'Falha na conexão' };
        }
    },

    removerDosFavoritos: async (id: string): Promise<RespostaApi> => {
        try {
            const resposta = await api.delete('/herois/favoritos/' + id);
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: 'Falha na conexão' };
        }
    },
};