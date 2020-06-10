
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note');
const imageUpload = require('../middleware/file');
const check_auth = require('../middleware/check-auth');

router.post('/add',check_auth, imageUpload, noteController.creatNote);

router.get('/notes', check_auth, noteController.getNotes);

router.delete('/remove/:id', noteController.deleteNote);

router.put('/update/:id', check_auth, noteController.editNote);

module.exports = router;