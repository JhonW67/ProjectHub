// backend/routes/auth.js

const express = require("express");
const router = express.Router();

// Importa o middleware de autenticação
const { authenticateToken } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");

// Importa o controller de autenticação
const authController = require("../controllers/authController");

// Rota para registrar um novo usuário
// Espera: { name, email, password }
router.post("/register", authController.register);

// Rota para login de usuário
// Espera: { email, password }
router.post("/login", authController.login);

// Rota para logout de usuário
// Protegida por autenticação
router.post("/logout", authenticateToken, authController.logout);

// Rota para redefinir a senha do usuário
// Espera: { email, newPassword }
router.post("/reset-password", authController.resetPassword);

// Rota para redefinir a senha do usuário
// Espera: { email, token, newPassword }
router.post("/reset-password/:token", authController.resetPasswordWithToken);

// Rota para verificar o token de redefinição de senha
// Espera: { email, token }
router.post("/verify-reset-token", authController.verifyResetToken);

// Rota para obter informações do usuário autenticado
// Protegida por autenticação
router.get("/me", authenticateToken, authController.getMe);

// Rota para atualizar informações do usuário autenticado
// Protegida por autenticação
router.put("/me", authenticateToken, authController.updateMe);

// Rota para deletar o usuário autenticado
// Protegida por autenticação
router.delete("/me", authenticateToken, authController.deleteMe);

// Rota para obter todos os usuários
// Protegida por autenticação e autorização de papel
router.get(
  "/admin",
  authenticateToken,
  authorizeRole(["admin"]),
  (req, res) => {
    res.send("Somente administradores acessam isso.");
  }
);

// Rota para atualizar o papel do usuário
// Protegida por autenticação e autorização de papel
router.put(
  "/me/role",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.updateRole
);

// Rota para deletar um usuário específico
// Protegida por autenticação e autorização de papel
router.delete(
  "/:userId",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.deleteUser
);

// Rota para obter informações de um usuário específico
// Protegida por autenticação e autorização de papel
router.get(
  "/:userId",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.getUser
);

// Rota para atualizar informações de um usuário específico
// Protegida por autenticação e autorização de papel
router.put(
  "/:userId",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.updateUser
);

// Rota para obter todos os papéis disponíveis
// Protegida por autenticação e autorização de papel
router.get(
  "/roles",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.getRoles
);

// Rota para criar um novo papel
// Protegida por autenticação e autorização de papel
router.post(
  "/roles",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.createRole
);

// Rota para atualizar um papel existente
// Protegida por autenticação e autorização de papel
router.put(
  "/roles/:roleId",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.updateRole
);

// Rota para deletar um papel existente
// Protegida por autenticação e autorização de papel
router.delete(
  "/roles/:roleId",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.deleteRole
);

// Rota para obter informações de um papel específico
// Protegida por autenticação e autorização de papel
router.get(
  "/roles/:roleId",
  authenticateToken,
  authorizeRole(["admin"]),
  authController.getRole
);

router.get("/api/users/:id", authenticateToken, (req, res) => {
  const userId = req.params.id;

  // Aqui você pode buscar o usuário pelo ID e retornar as informações
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  res.json(user);
});

// Exporta o router para ser usado no servidor principal
module.exports = router;
