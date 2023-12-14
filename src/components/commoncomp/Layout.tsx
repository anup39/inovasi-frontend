import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpened, setSidebarOpened] = useState(true);

  const sidebarWidth = sidebarOpened ? "256px" : "50px";
  const contentWidth = `calc(100vw - ${sidebarWidth})`;
  const pageHeight = `calc(100vh - 60px)`;

  return (
    <div className="flex relative">
      <div
        style={{
          width: sidebarWidth,
          flex: `0 0 ${sidebarWidth}`,
        }}
      >
        <Sidebar
          setSidebarOpened={setSidebarOpened}
          sidebarOpened={sidebarOpened}
        />
      </div>
      <div className="flex sticky flex-col" style={{ width: contentWidth }}>
        <NavBar />
        <div
          style={{ height: pageHeight }}
          className="flex-1 px-[49px] bg-bgPage bg-opacity-80 "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
