import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="w-[300px]">
        <Sidebar />
      </div>
      <NavBar />
      {children}
    </>
  );
}

export default Layout;
