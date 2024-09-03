const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); // Para segurança adicional

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); // Adiciona cabeçalhos de segurança HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado ao MongoDB Atlas"))
  .catch(err => console.error("Erro ao conectar ao MongoDB", err));

// Importar rotas
const baseRoutes = require('./routes/baseRoutes');
const triagemRoutes = require('./routes/triagemRoutes');
const anamneseRoutes = require('./routes/anamneseRoutes');

// Definindo as rotas
app.use('/api/base', baseRoutes);
app.use('/api/triagem', triagemRoutes);
app.use('/api/anamnese', anamneseRoutes);

// Rota padrão para tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

// Tratamento de erros genéricos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erro interno do servidor' });
});

// Configuração do IP e Porta do Servidor
const IP = process.env.IP || '127.0.0.1';
const PORT = process.env.PORT || 3000;
app.listen(PORT, IP, () => {
  console.log(`Servidor rodando em http://${IP}:${PORT}`);
});
