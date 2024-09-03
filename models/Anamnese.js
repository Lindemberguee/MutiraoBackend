const mongoose = require('mongoose');

const dynamicSchema = new mongoose.Schema(
  {
    // Defina os campos que são obrigatórios para todos os documentos
    requiredField: {
      type: String,
      required: false,
    },
    // Aqui você pode adicionar campos específicos do seu modelo
    // Eles serão opcionais e podem ser de qualquer tipo
    // Se eles não forem fornecidos, eles simplesmente não serão salvos
  },
  { strict: false } // Isso permite campos adicionais não definidos no esquema
);

module.exports = mongoose.model('Anamnese', dynamicSchema);
