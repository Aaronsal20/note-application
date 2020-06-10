const express = require("express");
const apiRoutes = require("./note");
const userRoutes = require('./user');

const router = express.Router();

router.use("/api/v1", apiRoutes);

router.use("/api/v1/user", userRoutes);

module.exports = router