// backend/controllers/evaluationController.js

const db = require('../config/db');

// Cria uma nova avaliação para um projeto
exports.createEvaluation = async (req, res) => {
  const { projectId } = req.params;
  const { professorId, score, comment } = req.body;

  // Validação básica
  if (!professorId || score === undefined) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes: professorId e score.' });
  }

  if (typeof score !== 'number' || score < 0 || score > 10) {
    return res.status(400).json({ message: 'Score deve ser um número entre 0 e 10.' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO evaluations (projectId, professorId, score, comment)
       VALUES (?, ?, ?, ?)`,
      [projectId, professorId, score, comment || null]
    );

    res.status(201).json({
      message: 'Avaliação criada com sucesso.',
      evaluationId: result.insertId
    });

  } catch (err) {
    console.error('Erro ao criar avaliação:', err);
    res.status(500).json({ message: 'Erro ao criar avaliação no banco de dados.' });
  }
};

// Recupera avaliação de um projeto
exports.getEvaluation = async (req, res) => {
  const { projectId } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM evaluations WHERE projectId = ?',
      [projectId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Nenhuma avaliação encontrada para este projeto.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar avaliação:', err);
    res.status(500).json({ message: 'Erro ao buscar avaliação no banco de dados.' });
  }
};
