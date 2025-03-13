import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button } from "react-bootstrap";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:5000/api/notes");
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div>
      <h2 className="text-center text-secondary mt-3">Список заметок</h2>
      {notes.length === 0 ? (
        <p className="text-center text-muted">Нет заметок</p>
      ) : (
        <ListGroup className="mt-3">
          {notes.map((note) => (
            <ListGroup.Item
              key={note._id}
              className="d-flex justify-content-between align-items-start flex-column"
              style={{ wordWrap: "break-word", maxWidth: "100%" }}
            >
              <div className="w-100">
                <strong className="d-block text-primary">{note.title}</strong>
                <p className="mb-1 text-secondary" style={{ whiteSpace: "pre-wrap" }}>
                  {note.content}
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                className="align-self-end mt-2"
                onClick={() => handleDelete(note._id)}
              >
                ❌ Удалить
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default NoteList;
