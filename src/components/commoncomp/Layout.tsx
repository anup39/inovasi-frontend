import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import "../../css/common/Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpened, setSidebarOpened] = useState(true);

  const sidebarWidth = sidebarOpened ? "256px" : "50px";

  return (
    <div className="flex relative min-h-[1080px]">
      <div
        className="absolute md:static"
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
        // style={{
        //   width: `calc(100% - ${sidebarWidth})`,
        // }}
        className={`custom-div ${
          sidebarOpened ? "custom-divOpen" : "custom-divClose"
        } ml-[50px] md:ml-0  md:px-0 `}
      >
        <div className="sticky">
          <NavBar />
        </div>
        <div className={`md:px-[49px] bg-bgPage bg-opacity-80 overflow-scroll`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
