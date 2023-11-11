import Menu from './Menu';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Menu />
      {children}
    </>
  );
}
export default Layout;
