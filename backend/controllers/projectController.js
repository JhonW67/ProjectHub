const db = require('../config/db');

exports.listProjects = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT p.*, g.name AS groupName
      FROM projects p
      LEFT JOIN groups g ON p.groupId = g.id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar projetos:', err);
    res.status(500).json({ message: 'Erro interno ao listar projetos' });
  }
};

exports.getProject = async (req, res) => {
  const { id } = req.params;
  try {
    // Busca o projeto com nome do grupo
    const [projects] = await db.promise().query(`
      SELECT p.*, g.name AS groupName
      FROM projects p
      LEFT JOIN groups g ON p.groupId = g.id
      WHERE p.id = ?
    `, [id]);

    if (!projects.length) return res.status(404).json({ message: 'Projeto não encontrado' });

    const project = projects[0];

    // Busca avaliações para calcular média
    const [evaluations] = await db.promise().query(
      'SELECT AVG(score) AS averageScore FROM evaluations WHERE projectId = ?',
      [id]
    );
    project.averageScore = evaluations[0].averageScore || null;

    res.json(project);
  } catch (err) {
    console.error('Erro ao buscar projeto:', err);
    res.status(500).json({ message: 'Erro interno ao buscar projeto' });
  }
};
