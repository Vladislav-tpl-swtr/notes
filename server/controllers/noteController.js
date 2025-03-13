const Note = require('../models/Note');

class NoteController {
  // Получить все заметки
  static async getNotes(req, res) {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера", error });
    }
  }

  // Получить одну заметку по ID
  static async getNoteById(req, res) {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) return res.status(404).json({ message: 'Заметка не найдена' });
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера", error });
    }
  }

  // Создать новую заметку
  static async createNote(req, res) {
    try {
      const { title, content } = req.body;
      const newNote = new Note({ title, content });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при создании заметки", error });
    }
  }

  // Обновить заметку
  static async updateNote(req, res) {
    try {
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedNote) return res.status(404).json({ message: 'Заметка не найдена' });
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при обновлении заметки", error });
    }
  }

  // Удалить заметку
  static async deleteNote(req, res) {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (!deletedNote) return res.status(404).json({ message: 'Заметка не найдена' });
      res.json({ message: 'Заметка удалена' });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при удалении заметки", error });
    }
  }
}

module.exports = NoteController;
