const Anamnese = require('../models/Anamnese');
const moment = require('moment'); // Moment.js para manipulação de datas

// CREATE - Criar uma nova anamnese
exports.createAnamnese = async (req, res) => {
  try {
    const anamnese = await Anamnese.create(req.body);
    res.status(201).json({ success: true, data: anamnese });
  } catch (err) {
    console.error('Erro ao criar anamnese:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ - Obter detalhes de uma anamnese específica
exports.getAnamneseById = async (req, res) => {
  try {
    const anamnese = await Anamnese.findById(req.params.id);
    if (!anamnese) {
      return res.status(404).json({ success: false, error: 'Anamnese não encontrada' });
    }
    res.status(200).json({ success: true, data: anamnese });
  } catch (err) {
    console.error('Erro ao obter anamnese por ID:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ - Listar todas as anamneses
exports.getAllAnamneses = async (req, res) => {
  try {
    const { especialidade, ano, idunico } = req.query;
    const filter = {};

    // Filtrar por especialidade
    if (especialidade) filter['anamnese.especialidade'] = especialidade;

    // Filtrar por ano de dataAtendimento
    if (ano) {
      // Usando regex para encontrar qualquer data que contenha o ano especificado
      const anoRegex = new RegExp(`/${ano}`, 'g');
      filter['anamnese.dataAtendimento'] = { $regex: anoRegex };
    }

    // Filtrar por ID único
    if (idunico) filter.idunico = idunico;

    // Consultar as anamneses usando os filtros
    const anamneses = await Anamnese.find(filter);
    res.status(200).json({ success: true, data: anamneses });
  } catch (err) {
    console.error('Erro ao listar todas as anamneses:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};



// UPDATE - Atualizar os detalhes de uma anamnese existente
exports.updateAnamnese = async (req, res) => {
  try {
    const anamnese = await Anamnese.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!anamnese) {
      return res.status(404).json({ success: false, error: 'Anamnese não encontrada' });
    }
    res.status(200).json({ success: true, data: anamnese });
  } catch (err) {
    console.error('Erro ao atualizar anamnese:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE - Excluir uma anamnese existente
exports.deleteAnamnese = async (req, res) => {
  try {
    const anamnese = await Anamnese.findByIdAndDelete(req.params.id);
    if (!anamnese) {
      return res.status(404).json({ success: false, error: 'Anamnese não encontrada' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error('Erro ao excluir anamnese:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE - Excluir todas as anamneses
exports.deleteAllAnamneses = async (req, res) => {
  try {
    await Anamnese.deleteMany({});
    res.status(200).json({ success: true, message: 'Todas as anamneses foram excluídas.' });
  } catch (err) {
    console.error('Erro ao excluir todas as anamneses:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};
