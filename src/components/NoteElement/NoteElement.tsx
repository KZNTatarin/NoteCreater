import { FC, useState } from "react";
import { INote } from "../../types/types";
import axios from "axios";
import MyBtn from "../../UI/MyBtn/MyBtn";
import Popup from "../../UI/Popup/Popup";
import "./NoteElement.css";
import pen from '../../img/pen.svg'

interface NoteElementProps {
  note: INote;
  loadNewNotes:() => Promise<void>
}

const NoteElement: FC<NoteElementProps> = ({ note, loadNewNotes }) => {
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateTextArea, setUpdateTextArea] = useState(note.content)


  async function deleteNote() {
    try {
      await axios.delete<INote[]>(`http://localhost:3000/notes/${note.id}`);
      loadNewNotes();
    } catch (e) {
      alert(e);
    }
  }

  async function UpdateNote() {
    try {
         await axios.put<INote[]>(`http://localhost:3000/notes/${note.id}`, {
            id: note.id,
            content: updateTextArea
        });
        setUpdateModalActive(false)
        loadNewNotes();
      } 
      catch (e) {
        alert(e);
      }
  }

  return (
    <>
    <div className="note__card">
      <div className="note__content">
        <p>
          {note.content}
        </p>
      </div>

      <div className="card__panel">
        <button className="panel-btn delete-btn" onClick={() => setDeleteModalActive(true)}>
          X
        </button>
        <MyBtn className="panel-btn update-btn" onClick={() => setUpdateModalActive(true)}>
          <img style={{width: '12px', color: 'white'}} src={pen} alt="" />
        </MyBtn>
      </div>
    </div>


    <Popup active={updateModalActive} setActive={setUpdateModalActive}>
      <h3>Редактировать заметку</h3>
        <textarea 
        style={{marginBottom: '15px'}}
        className="create-textarea"
        onChange={(e) => setUpdateTextArea(e.target.value)}
        value={updateTextArea}
        /> <br />
        <MyBtn onClick={UpdateNote}>Изменить</MyBtn>
        <MyBtn onClick={() => setUpdateModalActive(false)}>Отменить</MyBtn>
      </Popup>

      <Popup active={deleteModalActive} setActive={setDeleteModalActive}>
        <h3>Удалить заметку?</h3>
              <MyBtn onClick={deleteNote}>Да</MyBtn>
              <MyBtn onClick={() => setDeleteModalActive(false)}>Отмена</MyBtn>
      </Popup>
    </>
    
    
  );
};

export default NoteElement;
