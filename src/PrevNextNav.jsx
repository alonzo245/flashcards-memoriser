import { useLocalStorage } from "@rehooks/local-storage";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

function PrevNextNav({ nav }) {
  const [flashcards] = useLocalStorage("flashcards");
  const { listId } = useParams();
  const navigate = useNavigate();
  const nextBlock = flashcards?.[Number(listId) + 1];
  const prevBlock = flashcards?.[Number(listId) - 1];

  const handlePrev = () => {
    console.log(Number(listId) - 1);
    if (flashcards?.[Number(listId) - 1]) {
      navigate(`/flashcards-memoriser/${nav}/${Number(listId) - 1}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    console.log(Number(listId) + 1);
    if (flashcards?.[Number(listId) + 1]) {
      navigate(`/flashcards-memoriser/${nav}/${Number(listId) + 1}`);
      window.scrollTo(0, 0);
    }
  };

  return !Object.keys(flashcards?.[listId]?.list || {})?.length ? null : (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {prevBlock && (
        <button
          className="nextBlockButton"
          onClick={handlePrev}
        >{`הבא - ${prevBlock?.title}`}</button>
      )}
      {nextBlock && (
        <button
          className="nextBlockButton"
          onClick={handleNext}
        >{`הקודם - ${nextBlock?.title}`}</button>
      )}
    </div>
  );
}

export default PrevNextNav;
