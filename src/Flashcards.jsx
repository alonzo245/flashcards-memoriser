import { useLocalStorage } from "@rehooks/local-storage";
import { useState } from "react";
import "./App.css";
import Modal from "./Modal";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Flashcards() {
  const [expendCards] = useLocalStorage("expendCards");
  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize] = useLocalStorage("flashcardsFontSize", 20);
  const [modal, setModal] = useState(null);
  const { listId } = useParams();
  const navigate = useNavigate();
  const nextBlock = flashcards?.[Number(listId) + 1];
  const prevBlock = flashcards?.[Number(listId) - 1];
  console.log("prevBlock", prevBlock);

  const handlePrev = () => {
    console.log(Number(listId) - 1);
    if (flashcards?.[Number(listId) - 1]) {
      navigate(`/flashcards-memoriser/list/${Number(listId) - 1}`);
    }
  };

  const handleNext = () => {
    console.log(Number(listId) + 1);
    if (flashcards?.[Number(listId) + 1]) {
      navigate(`/flashcards-memoriser/list/${Number(listId) + 1}`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <>
      <h5 style={{ padding: "3px 10px" }}>{flashcards?.[listId]?.title}</h5>
      <div className="flashcards">
        {Object.keys(flashcards?.[listId]?.list).map((id) => {
          return (
            <div
              className="flashcard"
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
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {nextBlock && (
          <button
            className="nextBlockButton"
            onClick={handleNext}
          >{`הקודם - ${nextBlock?.title}`}</button>
        )}
        {prevBlock && (
          <button
            className="nextBlockButton"
            onClick={handlePrev}
          >{`הבא - ${prevBlock?.title}`}</button>
        )}
      </div>
      <Modal data={modal} setShow={setModal} />
    </>
  );
}

export default Flashcards;
