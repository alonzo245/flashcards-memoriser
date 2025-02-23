const TextAligment = ({ value, setValue }) => {
  const handleFullScreenToggle = () => {
    setValue(
      localStorage.getItem("flashcardsTeleprompterTextAlign") === "center"
        ? "right"
        : "center"
    );
  };

  return (
    <button className="nextBlockButton" onClick={handleFullScreenToggle}>
      {value === "center" ? "ימינה" : "מרכז"}
    </button>
  );
};

export default TextAligment;
