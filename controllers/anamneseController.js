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

// Função para converter "tempoAtendimento" para segundos
function tempoParaSegundos(tempoAtendimento) {
  const minutoMatch = tempoAtendimento.match(/(\d+)\sMinuto/);
  const segundoMatch = tempoAtendimento.match(/(\d+)\sSegundo/);

  const minutos = minutoMatch ? parseInt(minutoMatch[1]) : 0;
  const segundos = segundoMatch ? parseInt(segundoMatch[1]) : 0;

  return minutos * 60 + segundos;
}

// Função para converter segundos para o formato "Minuto(s) e Segundo(s)"
function segundosParaTempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const restoSegundos = segundos % 60;
  return `${minutos} Minuto(s) e ${restoSegundos} Segundo(s)`;
}

// Endpoint para calcular o tempo médio dos atendimentos por ano
exports.getTempoMedioPorAno = async (req, res) => {
  try {
    const { ano } = req.query;
    if (!ano) {
      return res.status(400).json({ success: false, error: "Ano é necessário" });
    }

    // Usar regex para encontrar todas as entradas com o ano especificado
    const anoRegex = new RegExp(`${ano}`, 'g');
    
    const anamneses = await Anamnese.find({
      'anamnese.dataAtendimento': { $regex: anoRegex }
    });

    if (anamneses.length === 0) {
      return res.status(404).json({ success: false, message: "Nenhum atendimento encontrado para o ano especificado" });
    }

    // Converter cada "tempoAtendimento" para segundos e calcular a média
    const temposEmSegundos = anamneses.map(anamnese => tempoParaSegundos(anamnese.anamnese.tempoAtendimento));
    const totalTempoEmSegundos = temposEmSegundos.reduce((total, tempo) => total + tempo, 0);
    const tempoMedioEmSegundos = totalTempoEmSegundos / temposEmSegundos.length;

    // Converter o tempo médio em segundos de volta para o formato "Minuto(s) e Segundo(s)"
    const tempoMedioFormatado = segundosParaTempo(Math.round(tempoMedioEmSegundos));

    res.status(200).json({
      success: true,
      data: {
        ano,
        tempoMedio: tempoMedioFormatado,
      }
    });
  } catch (err) {
    console.error('Erro ao calcular o tempo médio dos atendimentos:', err.message);
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
    const { especialidade, ano, idunico, dataAtendimento } = req.query;
    const filter = {};

    // Filtrar por especialidade
    if (especialidade) filter['anamnese.especialidade'] = especialidade;

    // Filtrar por ano de dataAtendimento (usando regex se o campo for string)
    if (ano) {
      const anoRegex = new RegExp(`${ano}`, 'g');
      filter['anamnese.dataAtendimento'] = { $regex: anoRegex };
    }

    // Filtrar por uma data específica de atendimento usando regex
    if (dataAtendimento) {
      const dateRegex = new RegExp(`^${dataAtendimento}`); // começa com o dia especificado
      filter['anamnese.dataAtendimento'] = { $regex: dateRegex };
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
