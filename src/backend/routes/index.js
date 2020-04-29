const express = require("express");
const apiRoutes = require("./note");

const router = express.Router();

router.use("/api/v1", apiRoutes);

// router.use("/", pageRoutes);

module.exports = router