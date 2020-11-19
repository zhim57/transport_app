const router = require("express").Router();
const taskRoutes = require("./tasks");
const userRoutes = require("./user");

// Book routes /api/products*
router.use("/tasks", taskRoutes);
// User routes /api/user*
router.use("/user", userRoutes);

module.exports = router;
