// controllers/ginecologistaController.js
const Ginecologista = require('../models/ginecologista');

// Função para criar um novo atendimento ginecológico
exports.criarAtendimento = async (req, res) => {
  try {
    const { nome, DIU, Preventivo } = req.body;

    const novoAtendimento = new Ginecologista({
      nome,
      DIU,
      Preventivo
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

    const atendimentos = await Ginecologista.find(filtro);
    res.status(200).json(atendimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar atendimentos' });
  }
};

// Função para atualizar um atendimento existente
exports.atualizarAtendimento = async (req, res) => {
  try {
    const { id } = req.params;
    const { DIU, Preventivo } = req.body;

    const atendimentoAtualizado = await Ginecologista.findByIdAndUpdate(
      id,
      { DIU, Preventivo },
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

    const atendimentoExcluido = await Ginecologista.findByIdAndDelete(id);
    if (!atendimentoExcluido) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    res.status(200).json({ message: 'Atendimento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir atendimento' });
  }
};
