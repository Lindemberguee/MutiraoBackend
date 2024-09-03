const mongoose = require('mongoose');

const atendimentoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  observacoes: {
    type: String,
    required: false
  }
});

const triagemSchema = new mongoose.Schema({
  requiredField: {
    type: String,
    required: false,
  },
  tipoAtendimento: {
    type: String,
    required: false,
  },
  bairro: {
    type: String,
    required: false,
  },
  telefone: {
    type: String,
    required: false,
  },
  nascimento: {
    type: String,
    required: false,
  },
  nome: {
    type: String,
    required: false,
  },
  pressao: {
    type: String,
    required: true
  },
  imc: {
    type: String,
    required: true
  },
  cartaoSus: {
    type: Number,
    required: true
  },
  estatura: {
    type: String,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  peso: {
    type: String,
    required: true
  },
  idfamiliar: {
    type: String,
    required: false
  },
  identificacao: {
    type: String,
    required: true
  },
  id: {
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
    type: Date,
    default: Date.now
  },
  atendimentos: [{
    pediatra: atendimentoSchema,
    "Atendimento geral": atendimentoSchema
  }]
});

module.exports = mongoose.model('Triagem', triagemSchema);
