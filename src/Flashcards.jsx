import { useLocalStorage } from "@rehooks/local-storage";
import { useState } from "react";
import "./App.css";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Flashcards() {
  const [expendCards] = useLocalStorage("expendCards");
  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize] = useLocalStorage("flashcardsFontSize", 20);
  const [modal, setModal] = useState(null);
  const { listId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <>
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
      <Modal data={modal} setShow={setModal} />
    </>
  );
}

export default Flashcards;
