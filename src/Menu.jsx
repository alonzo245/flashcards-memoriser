import { useLocalStorage } from "@rehooks/local-storage";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import "./App.css";

function Menu() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize, setFlashcardsFontSize] = useLocalStorage(
    "flashcardsFontSize",
    20
  );

  const onDelete = () => {
    console.log(flashcards, listId);
    delete flashcards[listId];
    console.log(flashcards[listId]);
    setFlashcards(flashcards);
  };

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
        <button className="fontButton" onClick={() => onDelete()}>
          מחיקה
        </button>
      </div>
      <Outlet />
    </>
  );
}

export default Menu;
