const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register',userController.createUser);

router.post('/confirmation', userController.confirmEmail);

router.post('/login', userController.signIn);


module.exports = router;
