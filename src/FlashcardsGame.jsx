import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "./Modal";
import { useParams } from "react-router-dom";

function FlashcardsGame() {
  const { listId } = useParams();
  const containerRef = useRef(null);

  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize] = useLocalStorage("flashcardsGameFontSize", 20);

  const [list, setList] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [modal, setModal] = useState(null);

  const handleClick = () => {
    if (flashcards?.[listId]?.list?.[currentIndex + 1]) {
      setList([...list, currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
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

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "80px" }}></div>
        <div className="flashcards-game" ref={containerRef}>
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
                {flashcards[listId]?.list[id].hint}
              </span>
            );
          })}
        </div>
      </div>
      <button
        onClick={shouldReset ? resetGame : handleClick}
        className="button-game-next"
        style={{
          padding: "20px",
          opacity: shouldReset ? 1 : "1",
          height: isScrolled ? "100vh" : "calc(100vh - 100px)",
        }}
      >
        {shouldReset ? "איפוס" : " הבא"}
      </button>
      <Modal data={modal} setShow={setModal} />
    </>
  );
}

export default FlashcardsGame;
