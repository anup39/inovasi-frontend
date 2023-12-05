import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const sidebarWidth = sidebarOpened ? "300px" : "50px";
  const contentWidth = `calc(100vw - ${sidebarWidth})`;

  return (
    <div className="flex">
      <div style={{ width: sidebarWidth, flex: `0 0 ${sidebarWidth}` }}>
        <Sidebar
          setSidebarOpened={setSidebarOpened}
          sidebarOpened={sidebarOpened}
        />
      </div>
      <div className="flex flex-col" style={{ width: contentWidth }}>
        <NavBar />
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
