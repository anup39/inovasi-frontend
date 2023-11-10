import Menu from '../components/commoncomp/Menu';
import NavBar from '../components/commoncomp/NavBar';

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
