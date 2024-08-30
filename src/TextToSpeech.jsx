import React, { useState, useEffect } from "react";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [speech, setSpeech] = useState(null);

  // Update the sentences array when the text changes
  useEffect(() => {
    setSentences(text.split("\n").filter((sentence) => sentence.trim() !== ""));
    setCurrentIndex(0);
  }, [text]);

  // Speak the current sentence and preload the next one
  useEffect(() => {
    if (speech) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
    }

    if (sentences.length > 0 && currentIndex < sentences.length) {
      const currentText = sentences[currentIndex];
      const currentSpeech = new SpeechSynthesisUtterance(currentText);
      currentSpeech.lang = "he-IL"; // Set the language to Hebrew (Israel)
      currentSpeech.rate = rate; // Set the speech rate
      window.speechSynthesis.speak(currentSpeech);
      setSpeech(currentSpeech);

      // Preload the next speech (but don't speak it yet)
      const nextText = sentences[currentIndex + 1];
      if (nextText) {
        const nextSpeech = new SpeechSynthesisUtterance(nextText);
        nextSpeech.lang = "he-IL"; // Set the language to Hebrew (Israel)
        nextSpeech.rate = rate; // Set the speech rate
        // This preload is in memory, ready for quick access
      }

      return () => {
        window.speechSynthesis.cancel(); // Clean up by canceling the speech when component unmounts or effect re-runs
      };
    }
  }, [currentIndex, sentences, rate]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <textarea
        rows="5"
        value={text}
        onChange={handleTextChange}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        placeholder="Type each sentence on a new line..."
      ></textarea>
      <br />
      <label htmlFor="rate">
        Speech Rate: <span>{rate}</span>
      </label>
      <input
        type="range"
        id="rate"
        min="0.5"
        max="2"
        value={rate}
        step="0.1"
        onChange={handleRateChange}
        style={{ display: "block", margin: "10px auto" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handlePrev}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;
