import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rotasHeroi from './routes/heroiRoutes';

dotenv.config();

const aplicacao = express();
const PORTA = process.env.PORTA || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/superhero-project';

aplicacao.use(cors());
aplicacao.use(express.json());

aplicacao.use('/api', rotasHeroi);

aplicacao.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Super Heróis',
    endpoints: {
      buscar: 'GET /api/herois/buscar?nome={nome}',
      externo: 'GET /api/herois/externo/:id',
      favoritos: 'GET /api/herois/favoritos',
      adicionarFavorito: 'POST /api/herois/favoritos',
      atualizarAnotacoes: 'PUT /api/herois/favoritos/:id/anotacoes',
      removerFavorito: 'DELETE /api/herois/favoritos/:id'
    }
  });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    aplicacao.listen(PORTA, () => {
      console.log(`Servidor rodando na porta ${27017}`);
      console.log(`Acesse: http://localhost:${27017}`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao conectar ao MongoDB:', erro);
  });

export default aplicacao;