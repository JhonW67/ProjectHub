// backend/config/db.js

// Importa o driver MySQL com suporte a Promises
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Verificação de variáveis de ambiente obrigatórias
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Erro: variável de ambiente ${envVar} não definida.`);
    process.exit(1); // Encerra o processo se faltar alguma
  }
});

// Cria um pool de conexões com configurações definidas no .env
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Número máximo de conexões simultâneas
  queueLimit: 0         // Sem limite de requisições na fila
});

// Testa a conexão inicial com o banco de dados
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Conectado ao banco de dados MySQL!');
    connection.release(); // Libera a conexão de volta para o pool
  } catch (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    process.exit(1); // Encerra o servidor se não conectar
  }
})();

// Exporta o pool para ser usado nos controllers e rotas
module.exports = db;
