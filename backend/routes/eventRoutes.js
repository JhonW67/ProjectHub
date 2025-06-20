// backend/routes/event.routes.js

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/eventController');

// Lista todos os eventos
router.get('/', ctrl.listEvents);

// Busca evento por ID
router.get('/:id', ctrl.getEvent);

module.exports = router;
