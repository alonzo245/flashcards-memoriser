import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Flashcards from "./Flashcards";
import Form from "./Form";
import Menu from "./Menu";
import FlashcardsList from "./FlashcardsList";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Routes>
          <Route path="/flashcards-memoriser/:id" element={<Flashcards />} />
          <Route path="/" element={<FlashcardsList />} />
          <Route path="/flashcards-memoriser" element={<FlashcardsList />} />
          <Route path="/flashcards-memoriser/add" element={<Form />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
