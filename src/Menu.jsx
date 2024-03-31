import { useLocalStorage } from "@rehooks/local-storage";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { useScreenSize } from "./hooks/useScreenSize";
import { mobileThreshold } from "./config/theme.constants";

function Menu() {
  const { width } = useScreenSize();

  const { listId } = useParams();
  const navigate = useNavigate();
  const match1 = useMatch("/flashcards-memoriser/list/:listId");
  const match2 = useMatch("/flashcards-memoriser/game/:listId");
  const match3 = useMatch("/flashcards-memoriser/interval/:listId");
  const match4 = useMatch("/flashcards-memoriser/remember-game/:listId");

  const [expendCards, setSxpendCards] = useLocalStorage("expendCards");
  const [flashcards, setFlashcards] = useLocalStorage("flashcards");
  const [flashcardsFontSize, setFlashcardsFontSize] = useLocalStorage(
    "flashcardsFontSize",
    20
  );
  const [flashcardsGameFontSize, setFlashcardsGameFontSize] = useLocalStorage(
    "flashcardsGameFontSize",
    20
  );

  const [flashcardsIntervalFontSize, setFlashcardsIntervalFontSize] =
    useLocalStorage("flashcardsIntervalFontSize", 20);

  const onDelete = () => {
    const result = window.confirm("למחוק?");
    if (result) {
      delete flashcards[listId];
      setFlashcards(flashcards);
      navigate("/flashcards-memoriser");
    }
  };

  const onEdit = () => {
    navigate(`/flashcards-memoriser/edit/${listId}`);
  };

  const onExpendCards = () => {
    setSxpendCards(!expendCards);
  };

  return (
    <div className="header">
      {width < mobileThreshold && (
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
      )}
      {(match1 || match2 || match3) && (
        <div className="fontRow">
          <button className="editButton" onClick={() => onExpendCards()}>
            {expendCards ? "צמצם" : "הרחב"}
          </button>

          <button
            className="fontButton"
            onClick={() => {
              if (match1) {
                setFlashcardsFontSize(flashcardsFontSize + 2);
              }
              if (match2) {
                setFlashcardsGameFontSize(flashcardsGameFontSize + 2);
              }
              if (match3) {
                setFlashcardsIntervalFontSize(flashcardsIntervalFontSize + 2);
              }
              // if (match4) {
              //   setFlashcardsIntervalFontSize(flashcardsIntervalFontSize + 2);
              // }
            }}
          >
            הגדל פונט
          </button>
          <button
            className="fontButton"
            onClick={() => {
              if (match1) {
                setFlashcardsFontSize(flashcardsFontSize - 2);
              }
              if (match2) {
                setFlashcardsGameFontSize(flashcardsGameFontSize - 2);
              }
              if (match3) {
                setFlashcardsIntervalFontSize(flashcardsIntervalFontSize - 2);
              }
              // if (match4) {
              //   setFlashcardsIntervalFontSize(flashcardsIntervalFontSize - 2);
              // }
            }}
          >
            הקטן פונט
          </button>
          <button className="editButton" onClick={() => onEdit()}>
            עריכה
          </button>
          <button className="editButton" onClick={() => onDelete()}>
            מחיקה
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
