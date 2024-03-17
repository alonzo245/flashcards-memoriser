import { useLocalStorage } from "@rehooks/local-storage";
import { useState } from "react";
import "./App.css";
import Modal from "./Modal";
import { useParams } from "react-router-dom";

function Flashcards() {
  const [flashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize] = useLocalStorage("flashcardsFontSize", 20);
  const [modal, setModal] = useState("");
  const { id: listId } = useParams();

  console.log(`flashcards?.[id]?.["list"]`, flashcards?.[listId]?.list, listId);
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
              onClick={() => setModal(flashcards[listId].list[id].text)}
            >
              {flashcards[listId]?.list[id].hint}
            </div>
          );
        })}
      </div>
      <Modal show={modal} setShow={setModal} />
    </>
  );
}

export default Flashcards;
