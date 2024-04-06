import { Outlet, useMatch } from "react-router-dom";
import FlashcardsList from "./FlashcardsList";
import Menu from "./Menu";
import { mobileThreshold } from "./config/theme.constants";
import { useScreenSize } from "./hooks/useScreenSize";

function Layout() {
  const { width } = useScreenSize();
  const matchTeleprompter = useMatch(
    "/flashcards-memoriser/teleprompter/:listId"
  );

  return (
    <div className="layout">
      <div className="main">
        {/* {width > mobileThreshold && <FlashcardsList />} */}
        {width > mobileThreshold && !matchTeleprompter && <FlashcardsList />}
        <div className="content">
          <Menu />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
