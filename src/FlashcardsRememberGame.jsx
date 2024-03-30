import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import PrevNextNav from "./PrevNextNav";
import RangeControlRemeberGame from "./RangeControlRemeberGame";

const Word = ({ text = "", forceShow = false }) => {
  const [show, setShow] = useState(() => forceShow);

  if (text === "###NEW_LINE###") {
    return <br />;
  }
  return (
    <span className="word" onClick={() => !show && setShow(!show)}>
      {show ? text : "_".repeat(text?.length)}
    </span>
  );
};

function FlashcardsRememberGame() {
  const containerRef = useRef(null);
  const { listId } = useParams();

  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize] = useLocalStorage("flashcardsGameFontSize", 20);

  const [value, setValue] = useState(0.9);

  function replaceWordsWithUnderline(text, replacementRatio) {
    const sentences = text
      .split(/\n/)
      .filter((i) => i)
      .join(" ###NEW_LINE### ");

    const words = sentences.split(/\s+/).filter((i) => i);
    const wordsFormatted = [...words];
    const numWordsToReplace = Math.floor(words.length * replacementRatio);

    const indices = [];
    while (indices.length < numWordsToReplace) {
      const index = Math.floor(Math.random() * words.length);
      if (!indices.includes(index)) {
        indices.push(index);
      }
    }

    indices.forEach((index) => {
      wordsFormatted[index] = (
        <Word key={`id-${index}`} text={wordsFormatted[index]} />
      );
    });

    return wordsFormatted.map((word, key) => {
      if (typeof word === "string") {
        return <Word key={`item-${key}`} text={word} forceShow={true} />;
      }
      return word;
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setValue(0.9);
  }, [listId]);

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="flashcards-remember-game" ref={containerRef}>
          <h5 style={{ padding: "3px 10px" }}>{flashcards?.[listId]?.title}</h5>
          <PrevNextNav nav={"remember-game"} />
          <RangeControlRemeberGame value={value} setValue={setValue} />
          {Object.keys(flashcards?.[listId]?.list).map((_, id) => {
            return (
              <div
                className="flashcard-game"
                style={
                  !flashcardsFontSize ? null : { fontSize: flashcardsFontSize }
                }
                key={`id-${id}`}
              >
                {replaceWordsWithUnderline(
                  flashcards?.[listId]?.list?.[id]?.text,
                  value
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FlashcardsRememberGame;
