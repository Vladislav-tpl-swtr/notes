import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { useState } from "react";
import { Container, Card } from "react-bootstrap";

function App() {
  const [update, setUpdate] = useState(false);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
  <Card className="p-4 shadow-lg w-50 d-flex flex-column" style={{ maxHeight: '90vh' }}>
    <h1 className="text-center text-primary mb-4">Мои заметки</h1>

    {/* NoteForm закреплена сверху и не будет уходить за пределы */}
    <div className="mb-3">
      <NoteForm onNoteAdded={() => setUpdate(!update)} />
    </div>

    {/* NoteList ограничена по высоте с прокруткой */}
    <div className="flex-grow-1 overflow-auto">
      <NoteList key={update} />
    </div>
  </Card>
</Container>

  );
}

export default App;
