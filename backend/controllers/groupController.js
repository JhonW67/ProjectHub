const db = require("../config/db");

// Lista todos os grupos
exports.listGroups = async (req, res) => {
  try {
    const [groups] = await db.promise().query("SELECT * FROM groups");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar grupos" });
  }
};

// Retorna um grupo específico, incluindo seus membros
exports.getGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const [[group]] = await db.query("SELECT * FROM groups WHERE id = ?", [id]);
    if (!group)
      return res.status(404).json({ message: "Grupo não encontrado" });

    const [members] = await db.query(
      "SELECT userId FROM group_members WHERE groupId = ?",
      [id]
    );
    group.members = members.map((m) => m.userId);

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar grupo" });
  }
};

// Lista os projetos de um grupo específico
exports.getGroupProjects = async (req, res) => {
  const { id } = req.params;
  try {
    const [projects] = await db
      .promise()
      .query("SELECT * FROM projects WHERE groupId = ?", [id]);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar projetos do grupo" });
  }
};

exports.joinGroup = async (req, res) => {
  const { code } = req.body;
  const userId = req.user?.id; // ajuste isso conforme seu sistema de autenticação

  if (!code)
    return res.status(400).json({ message: "Código do grupo é obrigatório." });

  try {
    const group = await Group.findOne({ where: { code } });
    if (!group)
      return res.status(404).json({ message: "Grupo não encontrado." });

    // Exemplo: cria um pedido de entrada, você pode adaptar
    await GroupRequest.create({ userId, groupId: group.id });

    return res
      .status(200)
      .json({ message: "Solicitação enviada com sucesso." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro interno ao entrar no grupo." });
  }
};
