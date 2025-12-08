import { Router } from 'express';
import HeroiController from '../controllers/HeroiController';

const roteador = Router();

roteador.get('/herois/buscar', HeroiController.buscarHerois);
roteador.get('/herois/externo/:id', HeroiController.buscarHeroiPorId);

roteador.get('/herois/favoritos', HeroiController.listarFavoritos);
roteador.post('/herois/favoritos', HeroiController.addFavoritos);
roteador.put('/herois/favoritos/:id/anotacoes', HeroiController.atualizarNotas);
roteador.delete('/herois/favoritos/:id', HeroiController.removerDosFavoritos);

export default roteador;