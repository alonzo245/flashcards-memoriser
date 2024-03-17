import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Flashcards from "./Flashcards";
import FlashCardsForm from "./FlashCardsForm";
import Menu from "./Menu";
import FlashcardsList from "./FlashcardsList";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<Menu />}>
            <Route
              path="/flashcards-memoriser/:listId"
              element={<Flashcards />}
            />
            <Route path="/" element={<FlashcardsList />} />
            <Route path="/flashcards-memoriser" element={<FlashcardsList />} />
            <Route
              path="/flashcards-memoriser/add"
              element={<FlashCardsForm edit={false} />}
            />
            <Route
              path="/flashcards-memoriser/edit/:listId"
              element={<FlashCardsForm edit={true} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
