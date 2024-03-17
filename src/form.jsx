import { useRef } from "react";
import "./App.css";

function Form({ setFlashcards }) {
  const textInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let flashCards = {};
    const paragraphs = textInputRef.current.value.split(/\n\s*\n/);
    paragraphs.forEach((paragraph, id) => {
      flashCards[id] = {
        hint: paragraph.split(/\s+/).slice(0, 2).join("\n\n"),
        text: paragraph,
      };
    });
    console.log(flashCards);
    setFlashcards(flashCards);
  };

  return (
    <div className="form">
      <button type="submit" onClick={handleSubmit}>
        אני רוצה לזכור!
      </button>
      <textarea ref={textInputRef} placeholder="הדבק טקסט ..." />
    </div>
  );
}

export default Form;
