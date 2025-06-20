// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

/**
 * Middleware para autenticação de token JWT.
 * Verifica se o token está presente e válido antes de continuar a rota.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Formato esperado: Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
      }

      req.user = decoded; // Decodifica e injeta os dados no request
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro na autenticação do token." });
  }
};

module.exports = {
  authenticateToken,
};
