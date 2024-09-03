const Triagem = require('../models/Triagem');
const { validationResult } = require('express-validator');

// Criar uma triagem para um paciente
exports.traigemPaciente = async (req, res) => {
    console.log('Dados recebidos para Triagem de Pacientes:', req.body); // Log dos dados recebidos

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Erros de validação:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const novaTriagem = new Triagem(req.body);
        const triagemSalva = await novaTriagem.save();
        console.log('Triagem Feita com Sucesso!:', triagemSalva); // Log da triagem adicionada
        res.status(201).json(triagemSalva);
    } catch (error) {
        console.error('Erro ao efetuar a Triagem:', error.message);
        res.status(500).json({ message: "Ocorreu um erro interno" });
    }
};

// Obter todas as triagens
exports.obterTriagem = async (req, res) => {
    try {
        const triagens = await Triagem.find(); // Busca todas as triagens
        res.json(triagens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter uma triagem por ID
exports.obterTriagemPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const triagem = await Triagem.findById(id); // Busca uma triagem por ID
        if (!triagem) {
            return res.status(404).json({ message: "Triagem não encontrada" });
        }
        res.json(triagem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar uma triagem
exports.atualizarTriagem = async (req, res) => {
    const id = req.params.id;

    try {
        const triagemAtualizada = await Triagem.findByIdAndUpdate(id, req.body, { new: true }); // Atualiza a triagem
        if (!triagemAtualizada) {
            return res.status(404).json({ message: "Triagem não encontrada" });
        }
        console.log('Triagem Atualizada:', triagemAtualizada); // Log da triagem atualizada
        res.json(triagemAtualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Excluir uma triagem
exports.excluirTriagem = async (req, res) => {
    const id = req.params.id;

    try {
        const triagemExcluida = await Triagem.findByIdAndDelete(id); // Exclui a triagem
        if (!triagemExcluida) {
            return res.status(404).json({ message: "Triagem não encontrada" });
        }
        console.log('Triagem Excluída:', triagemExcluida); // Log da triagem excluída
        res.json({ message: "Triagem excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.excluirTodos = async (req, res) => {
    try {
        await Triagem.deleteMany({});
        res.json({ message: 'Todos os registros de triagem foram excluídos com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir todos os registros de triagem:', error.message);
        res.status(500).json({ message: 'Ocorreu um erro interno ao excluir todos os registros de triagem.' });
    }
};