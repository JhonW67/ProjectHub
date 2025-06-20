const db = require("../config/db");

exports.listMessages = async (req, res) => {
  const { id } = req.params; // groupId
  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT m.*, u.name FROM group_messages m JOIN users u ON m.userId = u.id WHERE m.groupId = ? ORDER BY sent_at",
        [id]
      );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar mensagens" });
  }
};

exports.postMessage = async (req, res) => {
  const { id } = req.params; // groupId
  const { userId, content } = req.body;
  try {
    await db
      .promise()
      .query(
        "INSERT INTO group_messages (groupId, userId, content) VALUES (?, ?, ?)",
        [id, userId, content]
      );
    res.status(201).json({ message: "Mensagem enviada" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao enviar mensagem" });
  }
};
