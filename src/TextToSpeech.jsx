import React, { useState, useEffect } from "react";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pause, setpause] = useState(false);

  // Update the sentences array when the text changes
  useEffect(() => {
    const textb = text;
    console.log(textb.split("..."));

    setSentences(
      textb
        .split("...")
        .filter((sentence) => sentence.trim() !== "")
        .map((sentence) => {
          console.log("sssss", `${sentence}...`);
          return `${sentence}...`;
        })
    );
    setCurrentIndex(0);
  }, [text]);

  // Function to speak a segment with a pause after "..."
  const speakSegment = (segment) => {
    return new Promise((resolve) => {
      const speech = new SpeechSynthesisUtterance(segment);
      speech.lang = "he-IL"; // Set the language to Hebrew (Israel)
      speech.rate = rate; // Set the speech rate

      speech.onend = () => {
        resolve();
      };

      window.speechSynthesis.speak(speech);
    });
  };

  // Function to speak the current sentence with pauses at "..."
  const speakCurrentSentence = async () => {
    if (currentIndex < sentences.length) {
      setIsSpeaking(true);
      const parts = sentences[currentIndex].split("...");

      for (const part of parts) {
        await speakSegment(part.trim());
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause for 1 second
      }

      setIsSpeaking(false);
    }
  };

  // Handle the speech when the currentIndex changes
  useEffect(() => {
    if ("speechSynthesis" in window && sentences.length > 0 && !isSpeaking) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      speakCurrentSentence();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentIndex, sentences, rate]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const handleNext = () => {
    if (!isSpeaking && currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePause = () => {
    setpause(!pause);
    if (!pause) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
  };

  const handlePrev = () => {
    if (!isSpeaking && currentIndex > 0) {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handlePause}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Pause
        </button>
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
      <textarea
        rows="5"
        value={text}
        onChange={handleTextChange}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        placeholder="Type each sentence on a new line..."
      ></textarea>
    </div>
  );
}

export default TextToSpeech;
