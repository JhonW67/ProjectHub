// backend/routes/evaluationRoutes.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/evaluationController");
const { authenticateToken } = require("../middlewares/authMiddleware"); // se quiser proteger com login

// POST /api/evaluations/:projectId/evaluate
// Cria uma nova avaliação para um projeto
router.post("/:projectId/evaluate", authenticateToken, ctrl.createEvaluation);

// GET /api/evaluations/:projectId/evaluate
// Retorna a avaliação de um projeto específico
router.get("/:projectId/evaluate", authenticateToken, ctrl.getEvaluation);

module.exports = router;
