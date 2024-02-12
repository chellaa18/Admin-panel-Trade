import React, { useState, useEffect } from "react";
import { AppContent, AppFooter, AppSideBar } from "../components/index";
import { AppHeader } from "../components/header/index";

const DefaultLayout = () => {
  const handleScreenWidth = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 760) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleScreenWidth();

    window.addEventListener("resize", handleScreenWidth);

    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, []);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <AppSideBar isSidebarOpen={isSidebarOpen} />
      <div className="">
        <AppHeader
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="body flex-grow-1 px-3">
          <AppContent isSidebarOpen={isSidebarOpen} />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
