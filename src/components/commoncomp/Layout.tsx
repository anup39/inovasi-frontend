import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpened, setSidebarOpened] = useState(true);

  const sidebarWidth = sidebarOpened ? "256px" : "50px";
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
      <div
        className={`flex ${
          sidebarOpened ? "w-[1664px]" : "w-[1866px]"
        } flex-col`}
      >
        <div className="sticky">
          <NavBar />
        </div>
        <div className=" h-[984px] px-[49.5px] bg-bgPage bg-opacity-80 overflow-scroll ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
