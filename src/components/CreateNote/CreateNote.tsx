import { FC, useState } from "react";
import axios from "axios";
import Popup from "../../UI/Popup/Popup";
import MyBtn from "../../UI/MyBtn/MyBtn";
import "./CreateNote.css";
import warningPng from "../../img/Warning.jpg";

interface dataToSendProps {
  id: string;
  content: string;
}

interface ICreateNote {
  loadNewNotes: () => Promise<void>;
}

const CreateNote: FC<ICreateNote> = ({ loadNewNotes }) => {
  const [modalActive, setModalActive] = useState(false);
  const [contentTextarea, setcontentTextarea] = useState("");

  const dataSend: dataToSendProps = {
    id: (Math.random() * 10000).toFixed(0),
    content: contentTextarea,
  };

  const sendData = () => {
    axios
      .post("http://localhost:3000/notes", dataSend)
      .then(() => {
        setcontentTextarea("");
        loadNewNotes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="create__section">
        <textarea
          className="create-textarea"
          onChange={(e) => setcontentTextarea(e.target.value)}
          value={contentTextarea}
        />
        <MyBtn
          className="create-btn"
          onClick={() => {
            contentTextarea.trim() === "" ? setModalActive(true) : sendData();
          }}
        >
          добавить
        </MyBtn>
      </div>
      <Popup active={modalActive} setActive={setModalActive}>
        <img style={{ width: "100px" }} src={warningPng} alt="" />
        <p style={{ fontSize: "25px" }}>Заполните поле!</p>
        <MyBtn onClick={() => setModalActive(false)}>ОК</MyBtn>
      </Popup>
    </>
  );
};

export default CreateNote;
