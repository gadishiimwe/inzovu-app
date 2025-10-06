import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import StickyCartBar from "./StickyCartBar";

export default function Layout() {
  const location = useLocation();
  const showSidebar = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile and tablet */}
        {showSidebar && (
          <div className="hidden xl:block">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
      <StickyCartBar />
    </div>
  );
}
