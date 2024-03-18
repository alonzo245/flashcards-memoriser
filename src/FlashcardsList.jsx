import { useLocalStorage } from "@rehooks/local-storage";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { timestampToDDMMYY } from "./utils";

function FlashcardsList() {
  const navigate = useNavigate();
  const [flashcards] = useLocalStorage("flashcards");

  const handleClick = (e, id) => {
    e.stopPropagation();
    navigate(`/flashcards-memoriser/game/${id}`);
  };

  const list = Object.keys(flashcards || {}).reverse() || {};

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
              onClick={() => navigate(`/flashcards-memoriser/list/${id}`)}
            >
              <span>
                {flashcards[id].title ||
                  `${timestampToDDMMYY(flashcards?.[id]?.created)}`}
              </span>
              <span
                className="start-game-button"
                onClick={(e) => handleClick(e, id)}
              >
                משחק זכרון
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FlashcardsList;
