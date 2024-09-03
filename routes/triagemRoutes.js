const express = require('express');
const router = express.Router();
const triagemController = require('../controllers/triagemController');
const { body } = require('express-validator');

router.post('/adicionar', [
    body('pressao').trim().escape().not().isEmpty().withMessage('Pressão é obrigatória'),
    body('cartaoSus').trim().escape().not().isEmpty().withMessage('Cartão SUS é obrigatório'),
    body('estatura').trim().escape().not().isEmpty().withMessage('Estatura é obrigatória'),
    body('peso').trim().escape().not().isEmpty().withMessage('Peso é obrigatório'),
], function(req, res, next) {
    // Adicione as informações relevantes da requisição ao corpo da triagem
    req.body.ip = req.ip;
    req.body.userAgent = req.get('user-agent');
    req.body.timestamp = new Date();

    triagemController.traigemPaciente(req, res, next);
});

router.get('/buscar', triagemController.obterTriagem);
router.get('/buscar/:id', triagemController.obterTriagemPorId);
router.put('/atualizar/:id', triagemController.atualizarTriagem);
router.delete('/excluir/:id', triagemController.excluirTriagem);
router.delete('/excluir-todos', triagemController.excluirTodos);

module.exports = router;
