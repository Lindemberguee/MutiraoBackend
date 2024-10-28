// routes/oftalmologistaRoutes.js
const express = require('express');
const router = express.Router();
const oftalmologistaController = require('../controllers/oftalmologistaController');

// Rota para criar um novo atendimento
router.post('/', oftalmologistaController.criarAtendimento);

// Rota para listar todos os atendimentos ou buscar por nome
router.get('/', oftalmologistaController.listarAtendimentos);

// Rota para atualizar um atendimento existente
router.put('/:id', oftalmologistaController.atualizarAtendimento);

// Rota para excluir um atendimento existente
router.delete('/:id', oftalmologistaController.excluirAtendimento);

module.exports = router;
