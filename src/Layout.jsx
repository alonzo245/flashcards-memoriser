import { Outlet } from "react-router-dom";
import FlashcardsList from "./FlashcardsList";
import Menu from "./Menu";
import { mobileThreshold } from "./config/theme.constants";
import { useScreenSize } from "./hooks/useScreenSize";

function Layout() {
  const { width } = useScreenSize();

  return (
    <div className="layout">
      <div className="main">
        {width > mobileThreshold && <FlashcardsList />}
        <div className="content">
          <Menu />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
