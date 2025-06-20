const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/messageController");

// GET /api/groups/:id/messages
router.get("/group/:id/messages", ctrl.listMessages);

// POST /api/groups/:id/messages
router.post("/group/:id/messages", ctrl.postMessage);

module.exports = router;
