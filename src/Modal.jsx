import { useLocalStorage } from "@rehooks/local-storage";
import "./App.css";
import { useEffect, useRef } from "react";

function Modal({ data, setShow }) {
  const [modalFontSize, setShowFontSize] = useLocalStorage("modalFontSize", 20);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTo({
      top: 0,
    });
    if (data) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="modal"
      style={{
        display: !!data ? "flex" : "none",
        fontSize: modalFontSize ? `${modalFontSize}px` : `22px`,
      }}
    >
      <div>
        <div className="modalFontRow" onClick={() => setShow(null)}>
          <div style={{ color: "#888" }}>X</div>
          <h5>{data?.hint}</h5>
        </div>
        <hr style={{ marginBottom: "10px", borderColor: "#333" }} />
        <div
          dangerouslySetInnerHTML={{
            __html: (data?.text || "").split("\n").join("<br />"),
          }}
        />
      </div>
      <br />
      <br />
      <div style={{ marginBottom: "90px" }}>
        <button
          className="button bottom"
          style={{ padding: "20px" }}
          onClick={() => setShow(null)}
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
    </div>
  );
}

export default Modal;
