import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Flashcards from "./Flashcards";
import FlashCardsForm from "./FlashCardsForm";
import FlashcardsGame from "./FlashcardsGame";
import FlashcardsInterval from "./FlashcardsInterval";
import FlashcardsRememberGame from "./FlashcardsRememberGame";
import Layout from "./Layout";
import FlashcardsList from "./FlashcardsList";
import { useScreenSize } from "./hooks/useScreenSize";
import { mobileThreshold } from "./config/theme.constants";
import Teleprompter from "./Teleprompter";
import TextToSpeech from "./TextToSpeech";

function App() {
  const { width } = useScreenSize();

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={width < mobileThreshold ? <FlashcardsList /> : null}
            />
            <Route
              path="/flashcards-memoriser/text-to-speech"
              element={<TextToSpeech />}
            />
            <Route
              path="/flashcards-memoriser/teleprompter/:listId"
              element={<Teleprompter />}
            />
            <Route
              path="/flashcards-memoriser"
              element={width < mobileThreshold ? <FlashcardsList /> : null}
            />
            <Route
              path="/flashcards-memoriser/list/:listId"
              element={<Flashcards />}
            />
            <Route
              path="/flashcards-memoriser/game/:listId"
              element={<FlashcardsGame />}
            />
            <Route
              path="/flashcards-memoriser/remember-game/:listId"
              element={<FlashcardsRememberGame />}
            />
            <Route
              path="/flashcards-memoriser/interval/:listId"
              element={<FlashcardsInterval />}
            />
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
