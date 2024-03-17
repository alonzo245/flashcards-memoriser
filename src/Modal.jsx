import { useLocalStorage } from "@rehooks/local-storage";
import "./App.css";

function Modal({ show, setShow }) {
  const [modalFontSize, setShowFontSize] = useLocalStorage("modalFontSize", 20);

  return (
    <div
      className="modal"
      style={{
        display: !!show ? "block" : "none",
        fontSize: modalFontSize ? `${modalFontSize}px` : `22px`,
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: show.split("\n").join("<br />"),
        }}
      />
      <br />
      <br />

      <button
        className="button"
        style={{ padding: "20px" }}
        onClick={() => setShow("")}
      >
        סגור
      </button>
      <div className="modalFontRow">
        <button
          className="fontButton"
          onClick={() => setShowFontSize(modalFontSize + 2)}
        >
          הגדל פונט
        </button>
        <button
          className="fontButton"
          onClick={() => setShowFontSize(modalFontSize - 2)}
        >
          הקטן פונט
        </button>
      </div>
    </div>
  );
}

export default Modal;
