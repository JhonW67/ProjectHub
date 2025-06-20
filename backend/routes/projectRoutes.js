const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectController');

// Lista todos os projetos com o nome do grupo
router.get('/', ctrl.listProjects);

// Obtém um projeto específico com nome do grupo e média das avaliações
router.get('/:id', ctrl.getProject);

module.exports = router;
