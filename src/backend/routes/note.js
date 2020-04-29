
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note');
const imageUpload = require('../middleware/file');

router.post('/add',imageUpload, noteController.creatNote);

router.get('/notes', noteController.getNotes);

router.delete('/remove/:id', noteController.deleteNote);

module.exports = router;