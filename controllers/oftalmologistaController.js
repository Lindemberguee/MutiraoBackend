// controllers/oftalmologistaController.js
const Oftalmologista = require('../models/oftalmologista');

// Função para criar um novo registro de atendimento
exports.criarAtendimento = async (req, res) => {
  try {
    const { nome, precisaOculos } = req.body;

    const novoAtendimento = new Oftalmologista({
      nome,
      precisaOculos
    });

    const atendimentoSalvo = await novoAtendimento.save();
    res.status(201).json(atendimentoSalvo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar atendimento' });
  }
};

// Função para listar todos os atendimentos ou buscar por nome
exports.listarAtendimentos = async (req, res) => {
  try {
    const { nome } = req.query;
    const filtro = nome ? { nome: new RegExp(nome, 'i') } : {}; // Busca por nome, se fornecido

    const atendimentos = await Oftalmologista.find(filtro);
    res.status(200).json(atendimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar atendimentos' });
  }
};

// Função para atualizar um atendimento existente
exports.atualizarAtendimento = async (req, res) => {
  try {
    const { id } = req.params;
    const { precisaOculos } = req.body;

    const atendimentoAtualizado = await Oftalmologista.findByIdAndUpdate(
      id,
      { precisaOculos },
      { new: true }
    );

    if (!atendimentoAtualizado) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    res.status(200).json(atendimentoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar atendimento' });
  }
};

// Função para excluir um atendimento existente
exports.excluirAtendimento = async (req, res) => {
  try {
    const { id } = req.params;

    const atendimentoExcluido = await Oftalmologista.findByIdAndDelete(id);
    if (!atendimentoExcluido) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    res.status(200).json({ message: 'Atendimento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir atendimento' });
  }
};
