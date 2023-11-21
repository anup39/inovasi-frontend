// import Menu from "./Menu";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {/* <Menu /> */}
      {children}
    </>
  );
}

export default Layout;
