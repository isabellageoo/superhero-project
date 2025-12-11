import axios from 'axios';
import { HeroiExterno, HeroiFavorito } from '../types/heroi';

const API_KEY = "cd89ba0cb6d8aec2c1a15461c0829fac";

const apiSuperHero = axios.create({
    baseURL: `https://superheroapi.com/api.php/${API_KEY}`,
    timeout: 10000,
});

const apiLocal = axios.create({
    baseURL: "http://192.168.1.15:3000",
    timeout: 10000,
});

const api = axios.create({
    baseURL: '/https://superheroapi.com/api/cd89ba0cb6d8aec2c1a15461c0829fac',
    timeout: 10000,
});

export interface RespostaApi {
    dados?: any;
    erro?: string;
}

export const servicoHeroi = {
    buscarHerois: async (nome: string) => {
        try {
            const resposta = await apiSuperHero.get(`/search/${nome}`);
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: "Falha na conexão" };
        }
    },

    buscarHeroiPorId: async (id: number) => {
        try {
            const resposta = await apiSuperHero.get(`/${id}`);
            return { dados: resposta.data };
        } catch (erro) {
            return { erro: "Falha na conexão" };
        }
    },
    
    buscarFavoritos: async () => {
        try {
            const resposta = await apiLocal.get("/herois/favoritos");
            return { dados: resposta.data };
        } catch {
            return { erro: "Falha na conexão" };
        }
    },

    adicionarFavoritos: async (heroiId: number, notas?: string) => {
        try {
            const resposta = await apiLocal.post("/herois/favoritos", { heroiId, notas });
            return { dados: resposta.data };
        } catch {
            return { erro: "Falha na conexão" };
        }
    },

    atualizarNotas: async (id: string, notas: string) => {
        try {
            const resposta = await apiLocal.put(`/herois/favoritos/${id}/notas`, { notas });
            return { dados: resposta.data };
        } catch {
            return { erro: "Falha na conexão" };
        }
    },

    removerDosFavoritos: async (id: string) => {
        try {
            const resposta = await apiLocal.delete(`/herois/favoritos/${id}`);
            return { dados: resposta.data };
        } catch {
            return { erro: "Falha na conexão" };
        }
    },
};