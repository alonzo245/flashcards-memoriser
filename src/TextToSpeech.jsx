// src/components/TextToSpeech.js
import React, { useState, useEffect, useRef } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pause, setpause] = useState(false);
  const [toggleButton, settogglebutton] = useState(true);

  useEffect(() => {
    window.speechSynthesis.cancel();
    const savedText = localStorage.getItem("text");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem("text", newText);
  };

  const handleToggleButton = () => {
    settogglebutton(!toggleButton);
  };
  const handlePause = () => {
    if (!pause && isSpeaking) {
      console.log("pause");

      window.speechSynthesis.pause();
      setpause(true);
    } else {
      if (isSpeaking) {
        console.log("play - is speacking");
        window.speechSynthesis.resume();
        setpause(false);
      } else {
        console.log("play");
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "he-IL";
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <>
      <br />
      <div
        onClick={handlePause}
        style={{
          width: "100vw",
          position: "fixed",
          top: 0,
          left: "0",
          zIndex: "111",
          height: "100vh",
          opacity: "0.9",
          border: "0px",
          background: "black",
          color: "#ffffff20",
          textAlign: "center",
          fontSize: "30px",
          display: toggleButton ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div> {pause || !isSpeaking ? "נגן" : "עצור"}</div>
      </div>
      <div
        onClick={handleToggleButton}
        style={{
          width: "100vw",
          position: "fixed",
          bottom: 0,
          left: "0",
          zIndex: "111",
          height: "20px",
          opacity: "0.9",
          border: "0px",
          background: "#222",
          color: "#ffffff20",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>{toggleButton ? "התחל" : "הסתר"}</div>
      </div>

      <textarea
        value={text}
        onChange={handleTextChange}
        rows="5"
        cols="30"
        placeholder="Enter text here..."
        style={{
          background: "black",
          color: "#666",
          width: "99vw",
          margin: "0 auto",
        }}
      />
    </>
  );
};

export default TextToSpeech;
