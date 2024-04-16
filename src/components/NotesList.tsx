import { FC } from "react";
import { INote } from "../types/types";
import NoteElement from "./NoteElement/NoteElement";

interface IProps {
  notes: INote[];
  loadNewNotes: () => Promise<void>;
}

const NotesList: FC<IProps> = ({ notes, loadNewNotes }) => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start" }}
    >
      {notes.map((note) => (
        <NoteElement key={note.id} note={note} loadNewNotes={loadNewNotes} />
      ))}
    </div>
  );
};

export default NotesList;
