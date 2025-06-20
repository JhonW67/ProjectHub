// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Teste simples
router.get("/", (req, res) => {
  res.json({ message: "Rota de usuários funcionando!" });
});

// Registro e login
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Listar todos os usuários (admin)
router.get("/all", authenticateToken, userController.listUsers);

// Buscar usuário por ID (apenas ele mesmo ou admin)
router.get("/:id", authenticateToken, userController.getUserById);

// Buscar grupo do usuário
router.get("/:id/group", userController.getUserGroup);

module.exports = router;
