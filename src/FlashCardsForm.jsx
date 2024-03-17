import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";
import "./App.css";
import { getNextKey } from "./utils";

function FlashCardsForm() {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useLocalStorage("flashcards");
  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedFlashCards = flashcards ? flashcards : {};
    const paragraphs = textInputRef.current.value.split(/\n\s*\n/);

    const newKey = getNextKey(flashcards);

    console.log("newKey", newKey);

    updatedFlashCards[newKey] = {
      title: titleInputRef.current.value || "",
      list: {},
      created: Date.now(),
    };

    paragraphs.forEach((paragraph, id) => {
      updatedFlashCards[newKey]["list"][id] = {
        hint: paragraph.split(/\s+/).slice(0, 2).join("\n\n"),
        text: paragraph,
      };
    });
    console.log(updatedFlashCards);
    setFlashcards(updatedFlashCards);

    titleInputRef.current.value = "";
    textInputRef.current.value = "";
    navigate(`/flashcards-memoriser`);
  };

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
