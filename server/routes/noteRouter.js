const express = require('express');
const NoteController = require('../controllers/noteController');

const router = express.Router();

router.get('/', NoteController.getNotes);
router.get('/:id', NoteController.getNoteById);
router.post('/', NoteController.createNote);
router.put('/:id', NoteController.updateNote);
router.delete('/:id', NoteController.deleteNote);

module.exports = router;
