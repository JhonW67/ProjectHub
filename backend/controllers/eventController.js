// backend/controllers/eventController.js
const db = require('../config/db');

// Lista todos os eventos
exports.listEvents = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM events');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao listar eventos:', err);
    res.status(500).json({ message: 'Erro ao listar eventos' });
  }
};

// Busca um evento específico pelo ID
exports.getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar evento:', err);
    res.status(500).json({ message: 'Erro ao buscar evento' });
  }
};
