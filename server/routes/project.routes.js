const express = require('express');
const router = express.Router();
const controller = require('../controllers/project.controller');

const { requireSignin, isAdmin } = require('../middleware/auth');

router.get("/", requireSignin, controller.getProjects);
router.post("/", requireSignin, isAdmin, controller.createProject);
router.put("/:id", requireSignin, isAdmin, controller.updateProject);
router.delete("/:id", requireSignin, isAdmin, controller.deleteProject);

module.exports = router;
