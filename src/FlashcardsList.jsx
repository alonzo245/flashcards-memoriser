import { useLocalStorage } from "@rehooks/local-storage";
import { useMatch, useNavigate } from "react-router-dom";
import "./App.css";

import { mobileThreshold } from "./config/theme.constants";
import { useScreenSize } from "./hooks/useScreenSize";
import { timestampToDDMMYY } from "./utils";
import { useState } from "react";

const isMobileDevice =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

function FlashcardsList() {
  const { width } = useScreenSize();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const titlesToCopy = [];

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

    // Only enter/exit fullscreen if on mobile
    if (isMobileDevice) {
      if (!isFullScreen) {
        // Enter full screen mode
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
        setIsFullScreen(true);
      } else {
        // Exit full screen mode
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        setIsFullScreen(false);
      }
    }

    // Navigate regardless of device
    navigate(`/flashcards-memoriser/teleprompter/${id}`);
  };

  const list = Object.keys(flashcards || {}).reverse() || {};

  // if (!matchTeleprompter) {
  //   return null;
  // }

  return (
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
        {!list?.length ? (
          <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
            אין שמירות עדיין
          </div>
        ) : (
          list.map((id, key) => {
            titlesToCopy.push(flashcards[id].title);
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
          })
        )}
        <div>
          <button
            className="navAdd2"
            onClick={() => {
              const stringToCopy = titlesToCopy.join("\n"); // Join array elements with newline
              navigator.clipboard
                .writeText(stringToCopy)
                .then(() => {
                  console.log("Array copied to clipboard");
                  // Optionally, you can add feedback to the user that the copy was successful
                })
                .catch((error) => {
                  console.error("Error copying array to clipboard: ", error);
                  // Handle any errors if the copy operation fails
                });
            }}
          >
            העתק נושאים
          </button>
          <button
            className="navAdd2"
            onClick={() => {
              navigate("/flashcards-memoriser/text-to-speech-line-break");
            }}
          >
            טקסט לדיבור ראשי פרקים
          </button>
          <button
            className="navAdd2"
            onClick={() => {
              navigate("/flashcards-memoriser/text-to-speech");
            }}
          >
            יש באג באנדרואידטקסט לדיבור
          </button>
          <button
            className="navAdd2"
            onClick={() => {
              navigate("/flashcards-memoriser/speech-save-file");
            }}
          >
            דיבור להורדה{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default FlashcardsList;
