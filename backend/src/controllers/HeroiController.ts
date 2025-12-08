import { Request, Response } from 'express';
import Heroi, { IHeroi } from '../models/Heroi';
import axios from 'axios';

const SUPERHERO_API_TOKEN = 'cd89ba0cb6d8aec2c1a15461c0829fac';
const API_BASE_URL = 'https://superheroapi.com/api/';

const converterParaPortugues = (dadosHeroi: any) => {
    return {
        id: dadosHeroi.id,
        nome: dadosHeroi.name,
        estatisticasPoder: {
            inteligencia: dadosHeroi.powerstats.intelligence || '0',
            forca: dadosHeroi.powerstats.strength || '0',
            velocidade: dadosHeroi.powerstats.speed || '0',
            durabilidade: dadosHeroi.powerstats.durability || '0',
            poder: dadosHeroi.powerstats.power || '0',
            combate: dadosHeroi.powerstats.combat || '0'
        },

        biografia: {
            'nomeCompleto': dadosHeroi.biography['full-name'] || '',
            'alterEgo': dadosHeroi.biography['alterEgo'] || '',
            apelidos: dadosHeroi.biography.aliases || [],
            'LocalDeNascimento': dadosHeroi.biography['place-of-birth'] || '',
            'primeiraAparicao': dadosHeroi.biography['first-appearece'] || '',
            editora: dadosHeroi.biography.publisher || '',
            alinhamento: dadosHeroi.biography.aligment || '',
        },

        image: {
            url: dadosHeroi.image?.url || ''
        }
    };
};

class HeroiController {
    public async buscarHerois(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.query;

            if (!nome) {
                return res.status(400).json({ erro: 'Nome do herói é obrigatório!' });
            }

            const resposta = await axios.get(
                `${API_BASE_URL}/${SUPERHERO_API_TOKEN}/search/${nome}`
            );

            if (resposta.data.response === 'error') {
                return res.status(404).json({ erro: resposta.data.error });
            }

            const heroisEmPortugues = (resposta.data.results || []).map((heroi: any) =>
                converterParaPortugues(heroi)
            );

            return res.json(heroisEmPortugues);
        } catch (erro: any) {
            return res.status(500).json({
                erro: 'Erro ao buscar heróis',
                detalhes: erro.message
            });
        }
    }

    public async buscarHeroiPorId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const resposta = await axios.get(
                `${API_BASE_URL}/${SUPERHERO_API_TOKEN}/${id}`
            );

            if (resposta.data.response === 'error') {
                return res.status(404).json({ erro: resposta.data.error });
            }

            const heroisEmPortugues = converterParaPortugues(resposta.data);
            return res.json(heroisEmPortugues);
        } catch (erro: any) {
            return res.status(505).json({
                erro: 'Erro ao buscar herói por ID',
                detalhes: erro.massage
            });
        }
    }

    public async addFavoritos(req: Request, res: Response): Promise<Response> {
        try {
            const { heroiId, notas } = req.body;

            const respostaExterna = await axios.get(
                `${API_BASE_URL}/${SUPERHERO_API_TOKEN}/${heroiId}`
            );

            if (respostaExterna.data.response === 'error') {
                return res.status(404).json({ error: respostaExterna.data.error });
            }

            const dadosHeroi = respostaExterna.data;
            const heroiExistente = await Heroi.findOne({ heroiId })

            if (heroiExistente) {
                return res.status(400).json({ erro: 'Herói já está nos favoritos' });
            }

            const heroi: IHeroi = new Heroi({
                heroiId: dadosHeroi.id,
                nome: dadosHeroi.name,
                estatisticasDePoder: {
                    inteligencia: dadosHeroi.powerstats.intelligence || '0',
                    forca: dadosHeroi.powerstats.strength || '0',
                    velocidade: dadosHeroi.powerstats.speed || '0',
                    durabilidadde: dadosHeroi.powerstats.durability || '0',
                    poder: dadosHeroi.powerstats.power || '0',
                    combate: dadosHeroi.powerstats.combat || '0'
                },
                biografia: {
                    'nomeCompleto': dadosHeroi.biography['full-name'] || '',
                    'alterEgo': dadosHeroi.biography['alterEgo'] || '',
                    apelidos: dadosHeroi.biography.aliases || [],
                    localDeNascimento: dadosHeroi.biography['place-of-birth'] || '',
                    'primeiraAparicao': dadosHeroi.biography['first-appearece'] || '',
                    editora: dadosHeroi.biography.publisher || '',
                    alinhamento: dadosHeroi.biography.aligment || ''
                },
                imagem: {
                    url: dadosHeroi.image?.url || ''
                },
                notas: notas || '',
                eFavorito: true
            });

            await heroi.save();

            return res.status(201).json(heroi);
        } catch (erro: any) {
            return res.status(400).json({
                erro: 'Erro ao adicionar aos favoritos',
                detalhes: erro.massage
            });
        }
    }

    public async listarFavoritos(req: Request, res: Response): Promise<Response> {
        try {
            const herois = await Heroi.find({ eFavorito: true }).sort({ createdAt: -1 });
            return res.json(herois);
        } catch (erro) {
            console.error('Erro ao buscar favoritos:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar favoritos' });
        }
    }

    public async atualizarNotas(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { notas } = req.body;

            const heroi = await Heroi.findByIdAndUpdate(
                id,
                { notas },
                { new: true }
            );

            if (!heroi) {
                return res.status(404).json({ erro: 'Herói não encontrado' });
            }

            return res.json(heroi);
        } catch (erro) {
            return res.status(400).json({ erro: 'Erro ao atualizar notas' });
        }
    }

    public async removerDosFavoritos(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const heroi = await Heroi.findByIdAndDelete(id);

            if (!heroi) {
                return res.status(404).json({ erro: 'Herói não encontrado' });
            }

            return res.json({ mensagem: 'Herói removido dos favoritos' });
        } catch (erro) {
            return res.status(400).json({ erro: 'Erro ao remover dos favoritos' });
        }
    }

    public async removerDosFavorito(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const heroi = await Heroi.findByIdAndDelete(id);

            if (!heroi) {
                return res.status(404).json({ erro: 'Herói não encontrado' });
            }

            return res.json({ mensagem: 'Herói removido dos favoritos' });
        } catch (erro) {
            return res.status(400).json({ erro: 'Erro ao remover dos favoritos' });
        }
    }
}

export default new HeroiController();