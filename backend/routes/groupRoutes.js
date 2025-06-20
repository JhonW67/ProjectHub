const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/groupController");

// Lista todos os grupos
router.get("/", ctrl.listGroups);

// Retorna um grupo específico por ID
router.get("/:id", ctrl.getGroup);

// Lista os projetos de um grupo específico
router.get("/:id/projects", ctrl.getGroupProjects);

router.post("/join", ctrl.joinGroup);

module.exports = router;
