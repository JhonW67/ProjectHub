// backend/controllers/authController.js

const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// -----------------------------
// REGISTRO DE USUÁRIO
// -----------------------------
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    course,
    registration,
    semester,
    classes,
  } = req.body;

  // Verifica campos obrigatórios
  if (!name || !email || !password || !userType) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes." });
  }

  // Verifica se o tipo de usuário é válido
  const validUserTypes = ["aluno", "avaliador", "admin"];
  if (!validUserTypes.includes(userType)) {
    return res.status(400).json({ message: "Tipo de usuário inválido." });
  }

  // Valida o campo "classes", se fornecido
  if (classes && !Array.isArray(classes)) {
    return res
      .status(400)
      .json({ message: 'Formato de "classes" inválido. Deve ser um array.' });
  }

  try {
    // Verifica se o email já está em uso
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email já cadastrado." });
    }

    // Criptografa a senha do usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário no banco de dados
    await db.execute(
      `INSERT INTO users (name, email, password, user_type, course, registration, semester, classes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        userType,
        course || null,
        registration || null,
        semester || null,
        JSON.stringify(classes || []),
      ]
    );

    return res.status(201).json({ message: "Usuário registrado com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// -----------------------------
// LOGIN DE USUÁRIO
// -----------------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo email
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const user = rows[0];

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.user_type,
      },
      JWT_SECRET,
      { expiresIn: "1d" } // Expira em 1 dia
    );

    // Retorna os dados do usuário (sem senha)
    return res.json({
      message: "Login bem-sucedido.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.user_type,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro interno no login." });
  }
};

// -----------------------------
// LOGOUT DE USUÁRIO
// -----------------------------
exports.logout = (req, res) => {
  // Como JWT é stateless, o logout normalmente é feito apenas no frontend
  // Aqui apenas retornamos uma resposta padrão
  return res.json({ message: "Logout bem-sucedido." });
};

// -----------------------------
// RESET DE SENHA (ainda não implementado)
// -----------------------------
exports.resetPassword = (req, res) => {
  return res.json({ message: "Reset de senha ainda não implementado." });
};

exports.resetPasswordWithToken = (req, res) => {
  return res.json({ message: "Reset com token ainda não implementado." });
};

// -----------------------------
// VERIFICAÇÃO DE TOKEN DE RESET (ainda não implementado)
// -----------------------------
exports.verifyResetToken = (req, res) => {
  return res.json({ message: "Verificação de token ainda não implementada." });
};

exports.verifyResetTokenWithToken = (req, res) => {
  return res.json({ message: "Verificação com token ainda não implementada." });
};

// -----------------------------
// PERFIL DO USUÁRIO AUTENTICADO (ainda não implementado)
// -----------------------------
exports.getMe = (req, res) => {
  return res.json({ message: "getMe ainda não implementado." });
};

exports.updateMe = (req, res) => {
  return res.json({ message: "updateMe ainda não implementado." });
};

exports.deleteMe = (req, res) => {
  return res.json({ message: "deleteMe ainda não implementado." });
};

// -----------------------------
// ADMIN: Gerenciamento de papéis e usuários (stubs)
// -----------------------------
exports.updateRole = (req, res) => {
  return res.json({ message: "updateRole ainda não implementado." });
};

exports.deleteUser = (req, res) => {
  return res.json({ message: "deleteUser ainda não implementado." });
};

exports.getUser = (req, res) => {
  return res.json({ message: "getUser ainda não implementado." });
};

exports.updateUser = (req, res) => {
  return res.json({ message: "updateUser ainda não implementado." });
};

exports.getRoles = (req, res) => {
  return res.json({ message: "getRoles ainda não implementado." });
};

exports.createRole = (req, res) => {
  return res.json({ message: "createRole ainda não implementado." });
};

exports.updateRole = (req, res) => {
  return res.json({ message: "updateRole ainda não implementado." });
};

exports.deleteRole = (req, res) => {
  return res.json({ message: "deleteRole ainda não implementado." });
};

exports.getRole = (req, res) => {
  return res.json({ message: "getRole ainda não implementado." });
};
