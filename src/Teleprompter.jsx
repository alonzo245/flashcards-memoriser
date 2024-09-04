import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { useScreenSize } from "./hooks/useScreenSize";
import { mobileThreshold } from "./config/theme.constants";
import FullScreen from "./FullScreen";

const ProgressBar = ({ array, currentItem, children }) => {
  const progress = ((currentItem + 1) / array.length) * 100; // Calculate progress percentage

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="title">{children && children}</div>
    </div>
  );
};

const FontRange = ({ value, setValue }) => {
  const navigate = useNavigate();

  const [flashcardsRememberFontSize, setFlashcardsRememberFontSize] =
    useLocalStorage("flashcardsTeleprompterFontSize", 50);

  const [flashcardsSpeakRate, setFlashcardsSpeakRate] = useLocalStorage(
    "flashcardsSpeakRate",
    1
  );

  // const handleIncrement = () => {
  //   if (value < 1) {
  //     setValue && setValue(value + 0.1);
  //     console.log("value", value + 0.1);
  //   }
  // };

  // const handleDecrement = () => {
  //   if (value.toFixed(1) > 0.1) {
  //     setValue && setValue(value - 0.1);
  //     console.log("value", value - 0.1);
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        opacity: "0.5",
      }}
    >
      <button
        className="nextBlockButton"
        onClick={() => {
          navigate("/flashcards-memoriser");
        }}
      >
        ראשי
      </button>
      <button
        className="nextBlockButton"
        onClick={() => {
          setFlashcardsRememberFontSize(flashcardsRememberFontSize + 2);
        }}
      >
        הגדל פונט
      </button>
      <button
        className="nextBlockButton"
        onClick={() => {
          setFlashcardsRememberFontSize(flashcardsRememberFontSize - 2);
        }}
      >
        הקטן פונט
      </button>
      <FullScreen />
      <button
        className="nextBlockButton"
        onClick={() => {
          setFlashcardsSpeakRate(flashcardsSpeakRate - 0.2);
        }}
      >
        איטי
      </button>
      <div>{flashcardsSpeakRate.toFixed(1)}</div>
      <button
        className="nextBlockButton"
        onClick={() => {
          setFlashcardsSpeakRate(flashcardsSpeakRate + 0.2);
        }}
      >
        מהיר
      </button>
    </div>
  );
};

function Teleprompter() {
  const { width } = useScreenSize();

  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsSpeakRate] = useLocalStorage("flashcardsSpeakRate", 1);
  const [flashcardsTeleprompterFontSize] = useLocalStorage(
    "flashcardsTeleprompterFontSize",
    50
  );
  const { listId } = useParams();
  const [position, setPosition] = useState(0);
  const [keyPressed, setKeyPressed] = useState(false);
  const [isPageDownPressed, setIsPageDownPressed] = useState(false);
  const [nextSpeech, setNextSpeech] = useState(null);

  const navigate = useNavigate();

  // const [touchStart, setTouchStart] = useState(null);
  // const [touchEnd, setTouchEnd] = useState(null);
  // const minSwipeDistance = 0;

  // const onTouchStart = (e) => {
  //   setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
  //   setTouchStart(e.targetTouches[0].clientX);
  // };

  // const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY);

  // const onTouchEnd = () => {
  //   if (!touchStart || !touchEnd) return;
  //   const distance = touchStart - touchEnd;
  //   const isUpSwipe = distance > minSwipeDistance;
  //   const isDownSwipe = distance < -minSwipeDistance;
  //   if (isUpSwipe || isDownSwipe) {
  //     console.log("swipe", isUpSwipe ? "isUpSwipe" : "isDownSwipe");
  //   }
  // };

  const handleKeyDown = (event, allow = false) => {
    event.preventDefault();

    if ([13, 34, 37, 32, 40].includes(event.keyCode) || allow) {
      console.log("pageDown");
      //pageDown
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

  const handleKeyUp = (event, allow = false) => {
    event.preventDefault();
    if ([33, 39, 38].includes(event.keyCode) || allow) {
      //pageUp
      console.log("pageUp");

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

  useEffect(() => {
    if (
      "speechSynthesis" in window &&
      flashcards?.[listId]?.list?.[position]?.text
    ) {
      const speech = new SpeechSynthesisUtterance(
        flashcards?.[listId]?.list?.[position]?.text
      );
      speech.lang = "he-IL"; // Set the language to Hebrew (Israel)
      speech.rate = flashcardsSpeakRate; // Set the speech rate
      window.speechSynthesis.speak(nextSpeech || speech);
      const nextText = flashcards?.[listId]?.list?.[position + 1]?.text;
      if (nextText) {
        const speech = new SpeechSynthesisUtterance(nextText);
        speech.lang = "he-IL"; // Set the language to Hebrew (Israel)
        speech.rate = flashcardsSpeakRate; // Set the speech rate
        setNextSpeech(speech);
      }
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [position]);

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

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyPressed, isPageDownPressed, position, listId]);

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          bottom: "20px",
          right: "20px",
        }}
      >
        <FontRange value={flashcardsTeleprompterFontSize} />
      </div>

      <div
        tabIndex={0}
        className="tele"
        onClick={(e) => handleKeyDown(e, true)}
        onContextMenu={(e) => handleKeyUp(e, true)}
      >
        <ProgressBar
          key={listId}
          array={Object.keys(flashcards?.[listId]?.list || {})}
          currentItem={+position}
        >
          <h5
            style={{
              padding: "0px 10px",
              fontSize: width < mobileThreshold ? "20px" : "22px",
            }}
          >
            {flashcards?.[listId]?.title}
          </h5>
        </ProgressBar>
        {/* position: {position} */}

        <div
          className="flashcards-tele"
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
        >
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
          {/* {flashcards[listId]?.list[position + 1]?.text && (
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
          )} */}
        </div>
      </div>
    </>
  );
}

export default Teleprompter;
