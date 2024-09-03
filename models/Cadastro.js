const mongoose = require('mongoose');

const cadastroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  nascimento: {
    type: Date,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  bairro: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  tipoAtendimento: {
    type: String,
    required: true
  },
  // Adicionando campos para informações da requisição
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cadastro', cadastroSchema);
