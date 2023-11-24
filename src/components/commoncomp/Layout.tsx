import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default Layout;
