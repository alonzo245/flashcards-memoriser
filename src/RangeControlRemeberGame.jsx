import React from "react";
import { useLocalStorage } from "@rehooks/local-storage";

const RangeControlRemeberGame = ({ value, setValue }) => {
  const [flashcardsRememberFontSize, setFlashcardsRememberFontSize] =
    useLocalStorage("flashcardsRememberFontSize", 20);

  const handleIncrement = () => {
    if (value < 1) {
      setValue(value + 0.1);
      console.log("value", value + 0.1);
    }
  };

  const handleDecrement = () => {
    if (value.toFixed(1) > 0.1) {
      setValue(value - 0.1);
      console.log("value", value - 0.1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <button className="nextBlockButton" onClick={handleDecrement}>
        גלה עוד
      </button>
      {/* <div style={{ margin: "0 10px" }}>{value.toFixed(1) * 10}</div> */}
      <button className="nextBlockButton" onClick={handleIncrement}>
        הסתר עוד
      </button>
      <button
        className="nextBlockButton"
        onClick={() => {
          setFlashcardsRememberFontSize(flashcardsRememberFontSize + 2);
        }}
      >
        הגדל פונט
      </button>
      <button
        className="nextBlockButton"
        onClick={() => {
          setFlashcardsRememberFontSize(flashcardsRememberFontSize - 2);
        }}
      >
        הקטן פונט
      </button>
    </div>
  );
};

export default RangeControlRemeberGame;
