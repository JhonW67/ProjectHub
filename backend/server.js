// backend/server.js
// Importando as dependências necessárias
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const projectRoutes = require("./routes/projectRoutes");
const groupRoutes = require("./routes/groupRoutes");
const messageRoutes = require("./routes/messageRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:8080", // URL do frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/groups", groupRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/evaluations", evaluationRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API do ProjectHub rodando com sucesso!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
