import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const audioRef = useRef(null);

  const speakText = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Set the language to Hebrew
    utterance.lang = "he-IL"; // Change to the desired language if needed

    // Play the text
    synth.speak(utterance);

    // Update the audio element to play the speech
    utterance.onstart = () => {
      console.log("Speech synthesis started");
    };

    utterance.onend = () => {
      console.log("Speech synthesis ended");
    };
  };

  const downloadAudio = () => {
    alert("Download functionality is limited due to browser restrictions.");
    // Download functionality with SpeechSynthesis is not natively supported in browsers
  };

  return (
    <div className="App">
      <h1>Text to Speech Recorder</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
        cols="30"
        placeholder="Enter text here"
      />
      <br />
      <button onClick={speakText}>Speak</button>
      <button onClick={downloadAudio} disabled={true}>
        Download as WAV
      </button>
      <audio ref={audioRef} controls></audio>
    </div>
  );
}

export default App;
