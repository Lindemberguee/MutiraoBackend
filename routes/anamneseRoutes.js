const express = require('express');
const router = express.Router();
const anamneseController = require('../controllers/anamneseController');

// Rotas CRUD para Anamnese
router.post('/', anamneseController.createAnamnese); // CREATE
router.get('/:id', anamneseController.getAnamneseById); // READ (Obter por ID)
router.get('/', anamneseController.getAllAnamneses); // READ (Listar todas)
router.put('/:id', anamneseController.updateAnamnese); // UPDATE (Atualizar por ID)
router.delete('/delete-all', anamneseController.deleteAllAnamneses); // DELETE ALL (Excluir todas)
router.delete('/:id', anamneseController.deleteAnamnese); // DELETE (Excluir por ID)

module.exports = router;
