import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка заполнения заголовка
    if (!title.trim()) {
      setError("❗ Напишите название заметки!");
      return;
    }

    // Проверка заполнения содержимого
    if (!content.trim()) {
      setError("❗ Напишите содержание заметки!");
      return;
    }

    try {
      const newNote = { title, content };
      await axios.post("http://localhost:5000/api/notes", newNote);

      // Очищаем поля после успешного добавления
      setTitle("");
      setContent("");
      setError(""); // Убираем ошибку
      onNoteAdded();
    } catch (err) {
      setError("❌ Ошибка при добавлении заметки!");
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Название заметки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={error.includes("Название") ? "border-danger" : ""}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          as="textarea"
          placeholder="Содержание заметки"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ maxHeight: "150px", resize: "none", overflowY: "auto" }}
          className={error.includes("содержание") ? "border-danger" : ""}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        ➕ Добавить заметку
      </Button>
    </Form>
  );
};

export default NoteForm;
