// middleware/roleMiddleware.js

const authorizeRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.userType)) {
      return res.status(403).json({ message: 'Acesso negado para este tipo de usuário.' });
    }
    next();
  };
};

module.exports = { authorizeRole };
