// src/components/TextToSpeech.js
import React, { useState, useEffect, useRef } from "react";

const TextToSpeech = () => {
  const speechRef = useRef(null);
  const [text, setText] = useState("");
  const [textRate, settextRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pause, setpause] = useState(false);
  const [toggleButton, settogglebutton] = useState(true);

  useEffect(() => {
    window.speechSynthesis.cancel();
    const savedText = localStorage.getItem("text");
    const textRate = localStorage.getItem("text-rate");
    if (savedText) {
      setText(savedText);
    }
    if (textRate) {
      settextRate(savedText);
    }
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem("text", newText);
  };

  const handleRateChange = (e) => {
    settextRate(e.target.value);
    if (speechRef.current) {
      window.speechSynthesis.rate = textRate;
    }
  };

  const handleToggleButton = () => {
    settogglebutton(!toggleButton);
    if (!speechRef.current) return;

    if (toggleButton) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.pause();
    }
  };

  const cleartext = () => {
    setText("");
    localStorage.clear("text");
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
        speechRef.current = new SpeechSynthesisUtterance(text);
        speechRef.current.lang = "he-IL";
        speechRef.current.rate = textRate;
        speechRef.current.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(speechRef.current);
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

        <br />
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
      <div
        for="rate"
        style={{
          display: "block",
          margin: "10px auto",
          width: "60%",
          textAlign: "center",
        }}
      >
        מהירות דיבור <span id="rate-value">{textRate}</span>
      </div>
      <input
        onChange={handleRateChange}
        type="range"
        min="0.8"
        max="5"
        value={textRate}
        step="0.2"
        style={{ display: "block", margin: "0px auto", width: "60%" }}
      />
      <div
        onClick={handleToggleButton}
        style={
          toggleButton
            ? {
                display: "block",
                margin: "0px auto",
                width: "60%",
                padding: "20px",
                textAlign: "center",
                background: "#111",
                marginTop: "20px",
              }
            : {
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
              }
        }
      >
        <div>{toggleButton ? "התחל" : "הסתר"}</div>
      </div>
      <div
        onClick={cleartext}
        style={{
          display: "block",
          margin: "0px auto",
          width: "60%",
          padding: "10px",
          textAlign: "center",
          background: "#111",
          marginTop: "20px",
        }}
      >
        <div>נקה טקסט</div>
      </div>
    </>
  );
};

export default TextToSpeech;
