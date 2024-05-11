import { useLocalStorage } from "@rehooks/local-storage";
import { useMatch, useNavigate } from "react-router-dom";
import "./App.css";

import { mobileThreshold } from "./config/theme.constants";
import { useScreenSize } from "./hooks/useScreenSize";
import { timestampToDDMMYY } from "./utils";

function FlashcardsList() {
  const { width } = useScreenSize();
  const matchTeleprompter = useMatch(
    "/flashcards-memoriser/teleprompter/:listId"
  );

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

  const handleClickRemember = (e, id) => {
    e.stopPropagation();
    navigate(`/flashcards-memoriser/remember-game/${id}`);
  };

  const handleClickTeleprompter = (e, id) => {
    e.stopPropagation();
    navigate(`/flashcards-memoriser/teleprompter/${id}`);
  };

  const list = Object.keys(flashcards || {}).reverse() || {};

  // if (!matchTeleprompter) {
  //   return null;
  // }

  return !list?.length ? (
    <div style={{ width: "100%", textAlign: "center" }}>אין שמירות עדיין</div>
  ) : (
    <>
      <div className="flashcardsList">
        {width > mobileThreshold && !matchTeleprompter && (
          <div className="navRow">
            <button
              className="navAdd"
              onClick={() => navigate("/flashcards-memoriser/add")}
            >
              הוספה
            </button>
          </div>
        )}
        {list.map((id, key) => {
          return (
            <div
              key={id}
              className="flashcardListItem"
              onClick={() =>
                matchTeleprompter
                  ? false
                  : navigate(`/flashcards-memoriser/list/${id}`)
              }
            >
              <span>
                {`${key + 1}. `}
                {flashcards[id].title ||
                  `${timestampToDDMMYY(flashcards?.[id]?.created)}`}
              </span>
              {!matchTeleprompter && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="count-button"
                    onClick={(e) => handleClick(e, id)}
                  >
                    {Object.keys(flashcards[id].list || {}).length}
                  </span>
                  <span
                    className="start-game-button"
                    onClick={(e) => handleClickRemember(e, id)}
                  >
                    📝
                  </span>
                  <span
                    className="start-game-button"
                    onClick={(e) => handleClick(e, id)}
                  >
                    ⬅️
                  </span>
                  <span
                    className="start-game-button"
                    onClick={(e) => handleClickInterval(e, id)}
                  >
                    ⏱️
                  </span>
                  <span
                    className="start-game-button"
                    onClick={(e) => handleClickTeleprompter(e, id)}
                  >
                    📺
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FlashcardsList;
