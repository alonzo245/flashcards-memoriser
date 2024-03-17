import { useState } from "react";
import "./App.css";
import Form from "./form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";

function App() {
  const [flashcards, setFlashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize, setFlashcardsFontSize] = useLocalStorage(
    "flashcardsFontSize",
    20
  );
  const [modalFontSize, setModalFontSize] = useLocalStorage(
    "modalFontSize",
    20
  );
  const [modal, setModal] = useState("");

  const Home = (
    <div className="main">
      <div className="fontRow">
        <button
          className="fontButton"
          onClick={() => setFlashcardsFontSize(flashcardsFontSize + 2)}
        >
          הגדל פונט
        </button>
        <button
          className="fontButton"
          onClick={() => setFlashcardsFontSize(flashcardsFontSize - 2)}
        >
          הקטן פונט
        </button>
        <button
          className="fontButton"
          onClick={() => deleteFromStorage("flashcards")}
        >
          נקה טקסט
        </button>
      </div>

      {!flashcards ? (
        <Form setFlashcards={setFlashcards} />
      ) : (
        <>
          <div className="flashcards">
            {Object.keys(flashcards).map((id) => {
              return (
                <div
                  className="flashcard"
                  style={
                    !flashcardsFontSize
                      ? null
                      : { fontSize: flashcardsFontSize }
                  }
                  key={id}
                  onClick={() => setModal(flashcards[id].text)}
                >
                  {flashcards[id].hint}
                </div>
              );
            })}
          </div>

          <div
            className="modal"
            style={{
              display: !!modal ? "block" : "none",
              fontSize: modalFontSize ? `${modalFontSize}px` : `22px`,
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: modal.split("\n").join("<br />"),
              }}
            />
            <br />
            <br />

            <button
              className="button"
              style={{ padding: "20px" }}
              onClick={() => setModal("")}
            >
              סגור
            </button>
            <div className="modalFontRow">
              <button
                className="fontButton"
                onClick={() => setModalFontSize(modalFontSize + 2)}
              >
                הגדל פונט
              </button>
              <button
                className="fontButton"
                onClick={() => setModalFontSize(modalFontSize - 2)}
              >
                הקטן פונט
              </button>
            </div>
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
