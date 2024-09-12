const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
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
    required: false
  },
  tipoAtendimento: {
    type: String,
    required: true
  },
  idfamiliar: {
    type: String,
    required: false
  },
  idunico: {
    type: String,
    required: false
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
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Base', baseSchema);
