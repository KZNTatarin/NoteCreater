import { FC, useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import CreateNote from "./components/CreateNote/CreateNote";
import { INote } from "./types/types";
import { NotesService } from "./api/requests";

import "./App.css";


const App: FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  async function fetchNotes() {
    try {
      const response = await NotesService.getNotes();
      setNotes(response.data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);
  
  return (
    <>
      <h2>Добавить заметку</h2>
      <CreateNote loadNewNotes={fetchNotes} />
      <h2>Список заметок</h2>
      <NotesList notes={notes} loadNewNotes={fetchNotes} />
    </>
  );
};

export default App;
