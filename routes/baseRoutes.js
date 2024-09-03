const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');
const { body } = require('express-validator');

// Rota para criar um novo paciente
router.post('/base', [
    body('nome').trim().escape().not().isEmpty().withMessage('Nome é obrigatório'),
    body('nascimento').trim().escape().not().isEmpty().withMessage('Nascimento é obrigatório'),
    body('sexo').trim().escape().not().isEmpty().withMessage('Sexo é obrigatório'),
    body('bairro').trim().escape().not().isEmpty().withMessage('Bairro é obrigatório'),
    body('telefone').trim().escape().not().isEmpty().withMessage('Telefone é obrigatório'),
    body('tipoAtendimento').trim().escape().not().isEmpty().withMessage('Atendimento é obrigatório'),
    body('idfamiliar').trim().escape().not().isEmpty().withMessage('Atendimento é obrigatório'),
], function(req, res, next) {
    // Adicione as informações relevantes da requisição ao corpo do paciente
    req.body.ip = req.ip;
    req.body.userAgent = req.get('user-agent');

    baseController.criarPaciente(req, res, next);
});


// Rota para obter a base de pacientes existentes
router.get('/base', async (req, res) => {
    try {
        await baseController.obterBase(req, res); // Passando req e res corretamente para o controlador
    } catch (error) {
        console.error('Erro ao buscar resultados:', error);
        res.status(500).json({ error: 'Erro ao buscar resultados' });
    }
});


// Rota para editar um paciente existente
router.put('/base/:id', baseController.editarPaciente);

// Rota para excluir um paciente existente
router.delete('/base/:id', baseController.excluirPaciente);

//Rota para excluir todos os usuários
router.delete('/excluir-todos', baseController.excluirTodos);

module.exports = router;
