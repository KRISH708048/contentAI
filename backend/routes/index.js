const express = require('express');
const outputRouter = require('./output')

const router = express.Router();

router.use("/user/", outputRouter);

module.exports = router;