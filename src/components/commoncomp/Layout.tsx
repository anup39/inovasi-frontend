import NavBar from "./NavBar";
// import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <Sidebar /> */}
      <NavBar />
      {children}
    </>
  );
}

export default Layout;
