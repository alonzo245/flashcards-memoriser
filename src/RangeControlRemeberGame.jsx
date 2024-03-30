import React from "react";

const RangeControlRemeberGame = ({ value, setValue }) => {
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
        גלה
      </button>
      <div style={{ margin: "0 10px" }}>{value.toFixed(1) * 10}</div>
      <button className="nextBlockButton" onClick={handleIncrement}>
        הסתר
      </button>
    </div>
  );
};

export default RangeControlRemeberGame;
