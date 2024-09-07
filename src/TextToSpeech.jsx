import React, { useState, useEffect, useRef } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const TextToSpeech = () => {
  const navigate = useNavigate();
  const speechRef = useRef(null);
  const speechObjRef = useRef(null);
  const [text, setText] = useState("");
  const [textRate, settextRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pause, setpause] = useState(true);
  const [toggleButton, settogglebutton] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [log, setlog] = useState(false);

  const handleFullScreenToggle = () => {
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
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
    localStorage.setItem("text", newText);
  };

  const handleRateChange = (e) => {
    settextRate(e.target.value);
    localStorage.setItem("text-rate", e.target.value);
    if (speechRef.current) {
      speechObjRef.current.rate = textRate;
    }
  };

  const handleToggleButton = () => {
    handleFullScreenToggle();
    settogglebutton(!toggleButton);
    if (!speechRef.current) return;

    if (toggleButton) {
      setpause(false);
      speechObjRef.current.resume();
    } else {
      setpause(true);
      speechObjRef.current.pause();
    }
  };

  const cleartext = () => {
    setText("");
    localStorage.clear("text");
  };

  const handlePause = () => {
    if (!speechObjRef.current) {
      speechObjRef.current = window.speechSynthesis;
    }

    if (!pause) {
      console.log("pause");
      setlog("pause");

      if (isSpeaking) {
        speechObjRef.current.pause();
        speechObjRef.current.paused = true;
        setlog(`pause - isSpeaking: ${isSpeaking}, `);
        setpause(true);
      }
    } else {
      console.log("isSpeaking", isSpeaking);
      setlog(`isSpeaking: ${isSpeaking}`);

      if (isSpeaking) {
        console.log("play - is speacking");

        setpause(false);
        speechObjRef.current.resume();
        speechObjRef.current.speaking = true;
        setlog(`play - is speacking: ${isSpeaking}`);
      } else {
        console.log("play");
        setlog("play");
        speechRef.current = new SpeechSynthesisUtterance(text);
        speechRef.current.lang = "he-IL";
        speechRef.current.rate = textRate;
        speechRef.current.onend = () => {
          setpause(true);
          setIsSpeaking(false);
        };
        speechObjRef.current.speak(speechRef.current);
        setIsSpeaking(true);
        setpause(false);
      }
    }
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    const savedText = localStorage.getItem("text");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    const textRate = localStorage.getItem("text-rate");

    if (textRate) {
      settextRate(textRate);
    }
  }, []);

  return (
    <>
      <div>טקסט לדיבור</div>
      <br />
      <button
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
        <div>
          <div> {pause ? "נגן" : "עצור"}</div>
          <div style={{ width: "100%", display: "block" }}>[{log}]</div>
        </div>
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
        type="number"
        min="0.4"
        max="5"
        value={textRate}
        step="0.2"
        style={{ display: "block", margin: "0px auto", padding: "10px" }}
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
      <div style={{ display: "flex", width: "50%", margin: "0 auto" }}>
        <div
          onClick={() => {
            settextRate((textRate - 0.2).toFixed(1));
            localStorage.setItem("text-rate", (textRate - 0.2).toFixed(1));
          }}
          style={{
            display: "block",
            margin: "0px auto",
            width: "50%",
            padding: "10px",
            textAlign: "center",
            background: "#111",
            marginTop: "20px",
          }}
        >
          <div>לאט</div>
        </div>
        <div
          onClick={() => {
            settextRate((textRate + 0.2).toFixed(1));
            localStorage.setItem("text-rate", (textRate + 0.2).toFixed(1));
          }}
          style={{
            display: "block",
            margin: "0px auto",
            width: "50%",
            padding: "10px",
            textAlign: "center",
            background: "#111",
            marginTop: "20px",
          }}
        >
          <div>מהר</div>
        </div>
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

export default TextToSpeech;
