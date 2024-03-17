import { useState } from "react";
import "./App.css";
import Form from "./form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";

function App() {
  const [flashcards, setFlashcards] = useLocalStorage("flashcards");
  const [modal, setModal] = useState("");

  const Home = (
    <div className="main">
      {!flashcards ? (
        <Form setFlashcards={setFlashcards} />
      ) : (
        <>
          <div className="flashcards">
            {Object.keys(flashcards).map((id) => {
              return (
                <div
                  className="flashcard"
                  key={id}
                  onClick={() => setModal(flashcards[id].text)}
                >
                  {flashcards[id].hint}
                </div>
              );
            })}
          </div>
          <button
            className="button button-reset"
            onClick={() => {
              deleteFromStorage("flashcards");
            }}
          >
            התחל מחדש
          </button>
          <div
            className="modal"
            style={{ display: !!modal ? "block" : "none" }}
          >
            {/* <button className="button" onClick={() => setModal("")}>
              סגור
            </button> */}
            <br />
            <br />
            {modal}
            <br />
            <br />
            <button className="button" onClick={() => setModal("")}>
              סגור
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/flashcards-memoriser" element={Home} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
