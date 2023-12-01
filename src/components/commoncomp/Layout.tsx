import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpened, setSidebarOpened] = useState(true);

  const sidebarWidth = sidebarOpened ? "250px" : "50px";
  const contentWidth = `calc(100% - ${sidebarWidth})`;

  return (
    <div className="flex">
      <div style={{ width: sidebarWidth, flex: `0 0 ${sidebarWidth}` }}>
        <Sidebar
          setSidebarOpened={setSidebarOpened}
          sidebarOpened={sidebarOpened}
        />
      </div>
      <div style={{ flex: "1", width: contentWidth }}>
        {" "}
        <NavBar />
        <div style={{ overflowX: "hidden", flex: "1" }}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
