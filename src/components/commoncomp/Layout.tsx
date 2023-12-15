import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpened, setSidebarOpened] = useState(true);

  const sidebarWidth = sidebarOpened ? "256px" : "50px";
  const contentWidth = `calc(200vw - ${sidebarWidth})`;
  // const pageHeight = `calc(1020px)`;

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
          // style={{ height: pageHeight }}
          className=" h-[984px] px-[48px] bg-bgPage bg-opacity-80 overflow-scroll "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
