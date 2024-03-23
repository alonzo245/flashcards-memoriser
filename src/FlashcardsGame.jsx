import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import PrevNextNav from "./PrevNextNav";

function FlashcardsGame() {
  const { listId } = useParams();
  const containerRef = useRef(null);

  const [expendCards] = useLocalStorage("expendCards");
  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize] = useLocalStorage("flashcardsGameFontSize", 20);

  const [list, setList] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [modal, setModal] = useState(null);

  const handleClick = (pickedItemsNum = 1) => {
    const cards = [];
    let index = 0;
    console.log("flashcards?.[listId]?.list", flashcards?.[listId]?.list);
    console.log("currentIndex", currentIndex);
    for (var i = currentIndex; i < currentIndex + pickedItemsNum; i++) {
      if (flashcards?.[listId]?.list?.[i + 1]) {
        cards.push(i + 1);
        index = i + 1;
      }
    }
    console.log(cards?.length, cards);
    console.log(index);
    if (cards?.length > 0) {
      setList([...list, ...cards]);
      setCurrentIndex(index);
    } else {
      setShouldReset(true);
    }
  };
  const resetGame = () => {
    setList([0]);
    setCurrentIndex(0);
    setShouldReset(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY >= 100);
  };

  useEffect(() => {
    if (!shouldReset) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [list]);

  useEffect(() => {
    setList([0]);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "80px" }}></div>
        <div className="flashcards-game" ref={containerRef}>
          <h5 style={{ padding: "3px 10px" }}>{flashcards?.[listId]?.title}</h5>
          <PrevNextNav nav={"game"} />

          {list.map((id) => {
            return (
              <span
                className="flashcard-game"
                style={
                  !flashcardsFontSize ? null : { fontSize: flashcardsFontSize }
                }
                key={id}
                onClick={() => setModal(flashcards[listId].list[id])}
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
      </div>
      <button
        onClick={shouldReset ? resetGame : () => handleClick(1)}
        className="button-game-next"
        style={{
          padding: "20px",
          opacity: shouldReset ? 1 : "1",
        }}
      >
        {shouldReset ? "איפוס" : " הבא"}
      </button>
      <button
        onClick={shouldReset ? resetGame : () => handleClick(3)}
        className="button-game-next-auto-x3"
        style={{
          padding: "20px",
          opacity: shouldReset ? 1 : "1",
          height: "120px",
        }}
      >
        X 3
      </button>
      <button
        onClick={shouldReset ? resetGame : () => handleClick(5)}
        className="button-game-next-auto-x5"
        style={{
          padding: "20px",
          opacity: shouldReset ? 1 : "1",
          // height: "120px",
          height: isScrolled ? "221px" : "120px",
          top: isScrolled ? "0" : "100px",
        }}
      >
        X 5
      </button>
      <Modal data={modal} setShow={setModal} />
    </>
  );
}

export default FlashcardsGame;
