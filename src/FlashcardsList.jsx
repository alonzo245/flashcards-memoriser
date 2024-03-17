import { useLocalStorage } from "@rehooks/local-storage";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { timestampToDDMMYY } from "./utils";

function FlashcardsList() {
  const navigate = useNavigate();
  const [flashcards] = useLocalStorage("flashcards");

  const list = Object.keys(flashcards || {}).reverse() || {};

  console.log("flashcards", flashcards);
  return !list?.length ? (
    <div style={{ width: "100%", textAlign: "center" }}>אין שמירות עדיין</div>
  ) : (
    <>
      <div className="flashcardsList">
        {list.map((id) => {
          return (
            <div
              key={id}
              className="flashcardListItem"
              onClick={() => navigate(`/flashcards-memoriser/${id}`)}
            >
              {flashcards[id].title ||
                `${timestampToDDMMYY(flashcards?.[id]?.created)}`}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FlashcardsList;
