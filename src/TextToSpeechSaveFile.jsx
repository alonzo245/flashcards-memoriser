import React, { useState, useEffect, useRef } from "react";

function TextToSpeechSaveFile() {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = () => {
    const stream = new MediaStream();
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      audioChunksRef.current = []; // Clear the chunks
    };

    mediaRecorder.start();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "he-IL"; // Set language to Hebrew (Israel)
    speech.rate = rate; // Set speech rate

    window.speechSynthesis.speak(speech);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const playTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "he-IL"; // Set language to Hebrew (Israel)
      speech.rate = rate; // Set speech rate

      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  const stopTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
      <h1>Hebrew Text to Speech Converter</h1>
      <textarea
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        placeholder="Type your text here..."
      ></textarea>
      <br />
      <label htmlFor="rate">Speech Rate: {rate}</label>
      <input
        type="range"
        id="rate"
        min="0.5"
        max="2"
        value={rate}
        step="0.1"
        onChange={(e) => setRate(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />
      <button
        onClick={playTextToSpeech}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
        disabled={isSpeaking}
      >
        {isSpeaking ? "Speaking..." : "Play Text to Speech"}
      </button>
      <button
        onClick={stopTextToSpeech}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
        disabled={!isSpeaking}
      >
        Stop
      </button>
      {/* <button
        onClick={() => setIsRecording(true)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Start Recording
      </button>
      <button
        onClick={() => setIsRecording(false)}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Stop Recording
      </button> */}
      {audioURL && (
        <div style={{ marginTop: "20px" }}>
          <h2>Download Your Recording</h2>
          <audio
            src={audioURL}
            controls
            style={{ display: "block", margin: "10px auto" }}
          ></audio>
          <a
            href={audioURL}
            download="speech.webm"
            style={{ display: "block", marginTop: "10px" }}
          >
            Download as WebM
          </a>
        </div>
      )}
    </div>
  );
}

export default TextToSpeechSaveFile;
