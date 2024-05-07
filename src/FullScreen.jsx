import { useState } from "react";

const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenToggle = () => {
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

  return (
    <button className="nextBlockButton" onClick={handleFullScreenToggle}>
      {isFullScreen ? "צא" : "מלא"}
    </button>
  );
};

export default FullScreen;
