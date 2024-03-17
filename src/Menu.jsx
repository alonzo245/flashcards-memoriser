import { deleteFromStorage, useLocalStorage } from "@rehooks/local-storage";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Menu() {
  const navigate = useNavigate();
  const [flashcardsFontSize, setFlashcardsFontSize] = useLocalStorage(
    "flashcardsFontSize",
    20
  );

  return (
    <>
      <div className="navRow">
        <button
          className="navButton"
          onClick={() => navigate("/flashcards-memoriser")}
        >
          רשימה
        </button>
        <button
          className="navButton"
          onClick={() => navigate("/flashcards-memoriser/add")}
        >
          הוספה
        </button>
      </div>
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
          מחיקה
        </button>
      </div>
    </>
  );
}

export default Menu;
