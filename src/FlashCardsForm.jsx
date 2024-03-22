import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";
import "./App.css";
import { generateNextKey, timestampToDDMMYY } from "./utils";

function FlashCardsForm({ edit = false }) {
  const navigate = useNavigate();
  const { listId } = useParams();
  const [flashcards, setFlashcards] = useLocalStorage("flashcards");
  const [isChecked, setIsChecked] = useState(false);

  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);

  /**
   * handleSubmit
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedFlashCards = flashcards ? flashcards : {};
    const paragraphs = textInputRef.current.value.split(/\n\s*\n/);

    const newKey = generateNextKey(flashcards);

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

  /**
   * handleSubmitWithAutoTitles
   * @param {*} event
   */
  const handleSubmitWithAutoTitles = (event) => {
    event.preventDefault();
    let updatedFlashCards = flashcards || {};
    const blocks = textInputRef.current.value.split(/\*\*/);

    let newKey = generateNextKey(flashcards);

    (blocks.reverse() || []).forEach((block) => {
      const paragraphs = block.split(/\n\s*\n/);
      if (!paragraphs?.[0]) {
        return;
      }

      console.log("flashcards", flashcards);
      newKey = generateNextKey(updatedFlashCards);

      let newCards = {};
      let title = "";

      console.log("paragraphs", paragraphs);
      paragraphs.forEach((paragraph, id) => {
        const hint = paragraph.split(/\s+/).slice(0, 2).join("\n\n");
        if (id === 0) {
          const str = paragraph?.split(/\*/);
          title = str?.[0];
          newCards[id] = {
            hint: str?.[1]?.split(/\s+/).slice(0, 3).join(" "),
            text: str?.[1],
          };
        }

        if (hint && id > 0) {
          newCards[id] = {
            hint,
            text: paragraph,
          };
        }
      });

      if (Object.keys(newCards)?.length) {
        console.log("newKey", newKey);
        updatedFlashCards[newKey] = {
          title: title || "",
          list: newCards,
          created: Date.now(),
        };
      }
    });
    console.log("blocks", updatedFlashCards);

    setFlashcards(updatedFlashCards);
    textInputRef.current.value = "";
    navigate(`/flashcards-memoriser`);
  };

  /**
   * handleUpdate
   * @param {*} event
   */
  const handleUpdate = (event) => {
    event.preventDefault();
    let updatedFlashCards = flashcards
      ? JSON.parse(JSON.stringify(flashcards))
      : {};

    const paragraphs = textInputRef.current.value.split(/\n\s*\n/);

    let newCards = {};
    paragraphs.forEach((paragraph, id) => {
      newCards[id] = {
        hint: paragraph.split(/\s+/).slice(0, 2).join("\n\n"),
        text: paragraph,
      };
    });

    updatedFlashCards[listId] = {
      title: titleInputRef.current.value || "",
      list: newCards,
      updated: Date.now(),
    };

    setFlashcards(updatedFlashCards);
    titleInputRef.current.value = "";
    textInputRef.current.value = "";
    navigate(`/flashcards-memoriser`);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (edit) {
      const title = flashcards?.[listId]?.title?.split(" - ");
      titleInputRef.current.value = `${title?.[0] || ""} - ${timestampToDDMMYY(
        Date.now()
      )}`;
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
        <div style={{ width: "100%", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={toggleCheckbox}
          />
          <span>{isChecked ? "הוספת כותרות אוטומטית" : "הוספה רגילה"}</span>
        </div>

        {!isChecked ? (
          <>
            <button type="submit" onClick={edit ? handleUpdate : handleSubmit}>
              {edit ? "עדכן" : "אני רוצה לזכור!"}
            </button>
            <input ref={titleInputRef} placeholder="כותרת" />
          </>
        ) : (
          <button type="submit" onClick={handleSubmitWithAutoTitles}>
            הוספה עם כותרות אוטומטיות
          </button>
        )}
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
