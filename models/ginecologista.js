// models/ginecologista.model.js
const mongoose = require('mongoose');

const ginecologistaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  dataAtendimento: {
    type: String,
    default: () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) // Horário de Brasília
  },
  DIU: {
    type: Boolean,
    required: true
  },
  Preventivo: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Ginecologista', ginecologistaSchema);
