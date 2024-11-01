const moment = require('moment-timezone');
const Base = require('../models/Base');

// Função para criar um novo paciente
exports.criarPaciente = async (req, res, next) => {
  try {
    // Obtenha a data e hora atual no fuso horário de Brasília
    const timestamp = moment().tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm');
    // Adicione a data e hora ao corpo da requisição, se ainda não estiver definida
    if (!req.body.timestamp) {
      req.body.timestamp = timestamp;
    }

    // Buscar o último paciente para obter o último idunico
    const ultimoPaciente = await Base.findOne().sort({ idunico: -1 });

    // Gerar o próximo idunico
    let novoIdunico = 'M240001'; // Valor padrão caso não exista nenhum registro
    if (ultimoPaciente && ultimoPaciente.idunico) {
      // Extrair o número do último idunico e incrementar
      const numeroAtual = parseInt(ultimoPaciente.idunico.slice(3)) + 1;
      novoIdunico = `M24${String(numeroAtual).padStart(4, '0')}`;
    }

    // Adicionar o novo idunico ao corpo da requisição
    req.body.idunico = novoIdunico;

    const novoPaciente = new Base(req.body);
    const pacienteSalvo = await novoPaciente.save();
    console.log('Cadastro Feito com Sucesso!:', pacienteSalvo); // Log do aluno adicionado
    res.status(201).json(pacienteSalvo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para editar um paciente existente
exports.editarPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Encontre o paciente pelo ID e atualize com os novos dados fornecidos na requisição
    const pacienteAtualizado = await Base.findByIdAndUpdate(id, req.body, { new: true });
    if (!pacienteAtualizado) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.status(200).json(pacienteAtualizado); // Responda com o paciente atualizado
  } catch (error) {
    // Se ocorrer algum erro, envie uma resposta de erro
    res.status(500).json({ error: error.message });
  }
};

// Função para excluir um paciente existente
exports.excluirPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Encontre o paciente pelo ID e exclua-o
    const pacienteExcluido = await Base.findByIdAndDelete(id);
    if (!pacienteExcluido) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.status(200).json({ message: 'Paciente excluído com sucesso' }); // Responda com uma mensagem de sucesso
  } catch (error) {
    // Se ocorrer algum erro, envie uma resposta de erro
    res.status(500).json({ error: error.message });
  }
};

// Função para obter a base de pacientes existentes
exports.obterBase = async (req, res) => {
  try {
    const { nome } = req.query;
    const filtro = nome ? { nome: new RegExp(nome, 'i') } : {}; // Usar regex para busca parcial, case-insensitive

    const pacientes = await Base.find(filtro);
    return res.status(200).json(pacientes);
  } catch (error) {
    console.error('Erro ao obter a base de pacientes:', error);
    return res.status(500).json({ error: 'Erro ao obter a base de pacientes' });
  }
};

exports.excluirTodos = async (req, res) => {
  try {
      await Base.deleteMany({});
      res.json({ message: 'Todos os registros da Base foram excluídos com sucesso.' });
  } catch (error) {
      console.error('Erro ao excluir todos os registros de triagem:', error.message);
      res.status(500).json({ message: 'Ocorreu um erro interno ao excluir todos os registros de Base.' });
  }
};