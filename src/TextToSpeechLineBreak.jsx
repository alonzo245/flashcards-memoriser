import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TextToSpeechLineBreak = () => {
  const navigate = useNavigate();
  const speechRef = useRef(null);
  const [text, setText] = useState("");
  const [textRate, settextRate] = useState(1);
  const [toggleButton, settogglebutton] = useState(true);
  const [utterances, setUtterances] = useState([]);
  const [position, setposition] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playing, setplaying] = useState(false);

  const handleFullScreenToggle = () => {
    console.log("navigator.userAgent", navigator.userAgent);

    if (!/Mobi|Android/i.test(navigator.userAgent)) {
      return;
    }

    if (!document?.documentElement) {
      return;
    }

    if (!isFullScreen) {
      // Enter full screen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      // Exit full screen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem("text-line-break", newText);
    preloadUtterances(newText);
  };

  const preloadUtterances = (text) => {
    const lines = text.split("\n");
    const newUtterances = lines
      .filter((line) => !!line)
      .map((line) => {
        // console.log("line: ", line);

        const utterance = new SpeechSynthesisUtterance(line);
        utterance.lang = "he-IL";
        utterance.rate = textRate || 1;
        return utterance;
      });
    setUtterances(newUtterances);
  };

  const handleRateChange = (e) => {
    const newRate = e.target.value;
    settextRate(newRate);
    localStorage.setItem("text-rate-line-break", newRate);
    if (utterances.length > 0) {
      setUtterances((prevUtterances) =>
        prevUtterances.map((utterance) => {
          utterance.rate = newRate;
          return utterance;
        })
      );
    }
  };

  const handleToggleButton = () => {
    handleFullScreenToggle();
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
    setUtterances([]);
    localStorage.removeItem("text-line-break");
  };

  const playNextUtterances = () => {
    if (!utterances?.[position]) {
      setposition(0);
      return;
    }

    window.speechSynthesis.cancel();
    setplaying(true);
    if (utterances.length > 0 && utterances?.[position]) {
      utterances[position].onend = function () {
        // alert("Speech has finished!");
        setplaying(false);
      };

      window.speechSynthesis.speak(utterances?.[position]);
      setposition(position + 1);
    }
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    const savedText = localStorage.getItem("text-line-break");
    if (savedText) {
      setText(savedText);
      preloadUtterances(savedText);
    }
  }, []);

  useEffect(() => {
    const textRate = localStorage.getItem("text-rate-line-break");
    if (textRate) {
      settextRate(textRate);
    }
  }, []);

  return (
    <>
      <div>טקסט לדיבור עם עצירה</div>
      <br />
      <button
        onClick={playNextUtterances}
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
        <div>{playing ? "מנגן" : "הבא"}</div>
        <br />
      </button>

      <textarea
        value={text}
        onChange={handleTextChange}
        rows="8"
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
        htmlFor="rate"
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

      <div
        onClick={() => navigate(`/flashcards-memoriser`)}
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
        <div>תפריט ראשי</div>
      </div>
    </>
  );
};

export default TextToSpeechLineBreak;
