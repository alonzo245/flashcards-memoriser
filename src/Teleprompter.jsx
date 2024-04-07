import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

const ProgressBar = ({ array, currentItem }) => {
  const progress = ((currentItem + 1) / array.length) * 100; // Calculate progress percentage

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>{" "}
      {/* {currentItem} */}
    </div>
  );
};

function Teleprompter() {
  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsTeleprompterFontSize] = useLocalStorage(
    "flashcardsTeleprompterFontSize",
    50
  );
  const { listId } = useParams();
  const [position, setPosition] = useState(0);
  const [keyPressed, setKeyPressed] = useState(false);
  const [isPageDownPressed, setIsPageDownPressed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setPosition(0);
  }, [listId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!Object.keys(flashcards?.[listId]?.list || {})?.length) {
      const last = Object.keys(flashcards || {})?.at(-1);
      console.log("last", last);
      navigate(`/flashcards-memoriser/teleprompter/${last}`);
      return;
    }

    const handleKeyDown = (event) => {
      if (event.keyCode === 34) {
        console.log("pageDown");
        //pageDown
        event.preventDefault();
        setKeyPressed(!keyPressed);
        setIsPageDownPressed(!isPageDownPressed);

        console.log("position", position);

        if (
          Object.keys(flashcards?.[listId]?.list || {})?.length >
          position + 1
        ) {
          setPosition(position + 1);
        } else {
          setPosition(0);
          // const last = Object.keys(flashcards || {})?.at(-1);
          // console.log("last", last);
          navigate(`/flashcards-memoriser/teleprompter/${+listId - 1}`);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.keyCode === 33) {
        //pageUp
        console.log("pageUp");
        event.preventDefault();
        // navigate(`/flashcards-memoriser/teleprompter/${+listId - 1}`);

        console.log("position", position);
        console.log(
          "Object.keys(flashcards?.[+listId + 1]?.list || {})?.length > 0",
          Object.keys(flashcards?.[+listId + 1]?.list || {})?.length > 0
        );
        if (position === 0) {
          console.log("ddd", flashcards?.[+listId + 1]?.list);

          if (Object.keys(flashcards?.[+listId + 1]?.list || {})?.length > 0) {
            console.log(`/flashcards-memoriser/teleprompter/${+listId + 1}`);
            navigate(`/flashcards-memoriser/teleprompter/${+listId + 1}`);
          }
          return;
        }

        if (Object.keys(flashcards?.[listId]?.list || {})?.length > 0) {
          setPosition(position - 1);
        } else {
          setPosition(0);
          // const last = Object.keys(flashcards || {})?.at(-1);
          // console.log("last", last);
          navigate(`/flashcards-memoriser/teleprompter/${+listId - 1}`);
        }
        setKeyPressed(!keyPressed);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyPressed, isPageDownPressed, position, listId]);

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <div tabIndex={0} className="tele">
      <ProgressBar
        key={listId}
        array={Object.keys(flashcards?.[listId]?.list || {})}
        currentItem={+position}
      />
      {/* position: {position} */}
      <h5 style={{ padding: "0px 10px", fontSize: "42px" }}>
        {flashcards?.[listId]?.title}
      </h5>
      <div className="flashcards-tele">
        {flashcards[listId]?.list[position]?.text && (
          <div
            className="flashcard-tele"
            style={
              !flashcardsTeleprompterFontSize
                ? null
                : { fontSize: flashcardsTeleprompterFontSize }
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: (flashcards[listId]?.list[position]?.text || "")
                  .split("\n")
                  .filter((line) => line)
                  .join("<br />"),
              }}
            />
          </div>
        )}{" "}
        {flashcards[listId]?.list[position + 1]?.text && (
          <div
            className="flashcard-tele-next"
            style={
              !flashcardsTeleprompterFontSize
                ? null
                : { fontSize: flashcardsTeleprompterFontSize - 20 }
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: (flashcards[listId]?.list[position + 1]?.text || "")
                  .split("\n")
                  .filter((line) => line)
                  .join("<br />"),
              }}
            />
          </div>
        )}{" "}
        {flashcards[listId]?.list[position + 2]?.text && (
          <div
            className="flashcard-tele-next"
            style={
              !flashcardsTeleprompterFontSize
                ? null
                : { fontSize: flashcardsTeleprompterFontSize - 20 }
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: (flashcards[listId]?.list[position + 2]?.text || "")
                  .split("\n")
                  .filter((line) => line)
                  .join("<br />"),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Teleprompter;
