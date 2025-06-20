const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

exports.registerUser = async (req, res) => {
  console.log("Dados recebidos no registro:", req.body);
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

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, userType, course, registration, semester, classes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        hashedPassword,
        userType,
        course,
        registration,
        semester,
        JSON.stringify(classes),
      ]
    );
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!rows.length)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.userType, // importante: nome do campo deve bater com o req.user.role
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

exports.listUsers = (req, res) => {
  res.json({ message: "Listar usuários ainda não implementado." });
};

/**
 * Buscar usuário por ID.
 * Apenas o próprio usuário ou um administrador pode acessar.
 */
exports.getUserById = async (req, res) => {
  const paramId = String(req.params.id);
  const requesterId = String(req.user.id);
  const requesterRole = req.user.role;

  if (paramId !== requesterId && requesterRole !== "admin") {
    return res.status(403).json({ message: "Acesso negado." });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, name, email, userType AS role FROM users WHERE id = ?",
      [paramId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro ao buscar usuário." });
  }
};

exports.getUserGroup = async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query(
      "SELECT g.* FROM groups g JOIN user_groups ug ON g.id = ug.group_id WHERE ug.user_id = ?",
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Grupo não encontrado" });
    }

    res.json(rows[0]); // ou `res.json(rows)` se quiser retornar todos os grupos
  } catch (err) {
    console.error("Erro ao buscar grupo do usuário:", err);
    res.status(500).json({ message: "Erro ao buscar grupo" });
  }
};
