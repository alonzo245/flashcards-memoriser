import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";
import "./App.css";
import { getNextKey, timestampToDDMMYY } from "./utils";

function FlashCardsForm({ edit = false }) {
  const navigate = useNavigate();
  const { listId } = useParams();
  const [flashcards, setFlashcards] = useLocalStorage("flashcards");

  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedFlashCards = flashcards ? flashcards : {};
    const paragraphs = textInputRef.current.value.split(/\n\s*\n/);

    const newKey = getNextKey(flashcards);

    let newCards = {};
    paragraphs.forEach((paragraph, id) => {
      newCards[id] = {
        hint: paragraph.split(/\s+/).slice(0, 2).join("\n\n"),
        text: paragraph,
      };
    });

    updatedFlashCards[newKey] = {
      title: titleInputRef.current.value || "",
      list: newCards,
      created: Date.now(),
    };

    setFlashcards(updatedFlashCards);
    titleInputRef.current.value = "";
    textInputRef.current.value = "";
    navigate(`/flashcards-memoriser`);
  };

  useEffect(() => {
    if (edit) {
      titleInputRef.current.value = `${
        flashcards?.[listId]?.title
      } - ${timestampToDDMMYY(Date.now())}`;
      let cards = Object.keys(flashcards?.[listId]?.list)
        .map((id) => flashcards?.[listId]?.list?.[id].text)
        .join("\n\n");

      textInputRef.current.value = cards;
    } else {
      titleInputRef.current.value = "";
      textInputRef.current.value = "";
    }
  }, [edit]);

  return (
    <>
      <div className="form">
        <button type="submit" onClick={handleSubmit}>
          אני רוצה לזכור!
        </button>
        <input ref={titleInputRef} placeholder="כותרת" />
        <textarea ref={textInputRef} placeholder="הדבק טקסט ..." />
      </div>
      <button
        type="submit"
        className="button"
        onClick={() => deleteFromStorage("flashcards")}
      >
        אפס שמירות
      </button>
    </>
  );
}

export default FlashCardsForm;
