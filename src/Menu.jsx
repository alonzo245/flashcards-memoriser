import { useLocalStorage } from "@rehooks/local-storage";
import { useNavigate, useParams, Outlet, useMatch } from "react-router-dom";
import "./App.css";

function Menu() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const match = useMatch("/flashcards-memoriser/:listId");
  console.log("match", match);
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
    navigate("/flashcards-memoriser");
  };

  const onEdit = () => {
    navigate(`/flashcards-memoriser/edit/${listId}`);
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
      {match && (
        <div className="fontRow">
          <button className="editButton" onClick={() => onEdit()}>
            עריכה
          </button>
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
          <button className="editButton" onClick={() => onDelete()}>
            מחיקה
          </button>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Menu;
