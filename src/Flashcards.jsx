import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Modal from "./Modal";
import PrevNextNav from "./PrevNextNav";

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
      <h5 style={{ padding: "3px 10px" }}>{flashcards?.[listId]?.title}</h5>
      <PrevNextNav nav={"list"} />
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
