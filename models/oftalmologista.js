// models/oftalmologista.model.js
const mongoose = require('mongoose');

const oftalmologistaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  dataAtendimento: {
    type: String,
    default: () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) // Horário de Brasília
  },
  precisaOculos: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Oftalmologista', oftalmologistaSchema);
