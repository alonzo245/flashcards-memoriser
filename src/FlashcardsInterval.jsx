import React, { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import { useParams } from "react-router-dom";

const FlashcardsInterval = () => {
  const { listId } = useParams();

  const [expendCards] = useLocalStorage("expendCards");
  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsIntervalFontSize] = useLocalStorage(
    "flashcardsIntervalFontSize",
    20
  );
  const containerRef = useRef(null);

  const [firstArray] = useState(Object.keys(flashcards?.[listId]?.list || {}));
  const [secondArray, setSecondArray] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [pause, setPause] = useState(true);
  const [speed, setSpeed] = useState(2500);

  const handlePause = () => {
    setPause(!pause);
  };

  const handleReset = () => {
    setSecondArray([]);
    setPause(false);
  };

  useEffect(() => {
    if (!pause) {
      if (secondArray.length === firstArray.length) {
        console.log("clear 2");
        clearInterval(intervalId);
      } else {
        const interval = setInterval(() => {
          console.log("speed", speed);
          console.log("numerator", secondArray.length);
          setSecondArray([...secondArray, firstArray[secondArray.length]]);
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, speed);
        setIntervalId(interval);
      }
    }

    return () => {
      console.log("clear", secondArray.length);
      clearInterval(intervalId);
    };
  }, [secondArray.length, pause, speed]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="flashcards-game">
        {secondArray.map((id) => {
          return (
            <span
              className="flashcard-game"
              style={
                !flashcardsIntervalFontSize
                  ? null
                  : { fontSize: flashcardsIntervalFontSize }
              }
              key={id}
            >
              {expendCards ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: (flashcards[listId]?.list[id]?.text || "")
                      .split("\n")
                      .filter((line) => line)
                      .join("<br />"),
                  }}
                />
              ) : (
                flashcards[listId]?.list[id]?.hint
              )}
            </span>
          );
        })}
      </div>
      <div className="navRow">
        <button className="navButton" onClick={handlePause}>
          {!pause && <div className="loader"></div>}
          {pause ? "המשך" : "עצירה"}
        </button>
        <button className="navButton" onClick={handleReset}>
          איפוס
        </button>
      </div>
      <div className="navRow">
        <button
          className="navButton"
          onClick={() => setSpeed((speed < 0 ? 0 : speed) - 500)}
        >
          האץ
        </button>
        <button
          className="navButton"
          onClick={() => setSpeed(speed + 500)}
          ref={containerRef}
        >
          האט
        </button>
      </div>
      <div style={{ marginBottom: "50px" }}></div>
    </div>
  );
};

export default FlashcardsInterval;
