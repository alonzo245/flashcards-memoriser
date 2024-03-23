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
  const handleClickInterval = (e, id) => {
    e.stopPropagation();
    navigate(`/flashcards-memoriser/interval/${id}`);
  };

  const list = Object.keys(flashcards || {}).reverse() || {};

  return !list?.length ? (
    <div style={{ width: "100%", textAlign: "center" }}>אין שמירות עדיין</div>
  ) : (
    <>
      <div className="flashcardsList">
        {list.map((id, key) => {
          return (
            <div
              key={id}
              className="flashcardListItem"
              onClick={() => navigate(`/flashcards-memoriser/list/${id}`)}
            >
              <span>
                {`${key + 1}. `}
                {flashcards[id].title ||
                  `${timestampToDDMMYY(flashcards?.[id]?.created)}`}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="start-game-button"
                  onClick={(e) => handleClick(e, id)}
                >
                  {Object.keys(flashcards[id].list || {}).length}
                </span>
                <span
                  className="start-game-button"
                  onClick={(e) => handleClick(e, id)}
                >
                  זכרון
                </span>
                <span
                  className="start-game-button"
                  onClick={(e) => handleClickInterval(e, id)}
                >
                  אינטרבל
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FlashcardsList;
