// routes/ginecologistaRoutes.js
const express = require('express');
const router = express.Router();
const ginecologistaController = require('../controllers/ginecologistaController');

// Rota para criar um novo atendimento ginecológico
router.post('/', ginecologistaController.criarAtendimento);

// Rota para listar todos os atendimentos ou buscar por nome
router.get('/', ginecologistaController.listarAtendimentos);

// Rota para atualizar um atendimento existente
router.put('/:id', ginecologistaController.atualizarAtendimento);

// Rota para excluir um atendimento existente
router.delete('/:id', ginecologistaController.excluirAtendimento);

module.exports = router;
