import { useNavigate } from 'react-router-dom';
import '../../css/common/Menu.css';
function Menu() {
  const navigate = useNavigate();

  function handleClick(path: string) {
    navigate(path);
    // setMenuOpen(false);
  }
  return (
    <div className='bg-[#DFE9FF] py-0 px-3  relative '>
      {/* Hamburger Icon */}
      <button
        className='z-30 block focus:outline-none absolute right-4 top-4 
      hamburger'
      >
        <span className='hamburger-top'></span>
        <span className='hamburger-middle'></span>
        <span className='hamburger-bottom'></span>
      </button>
      {/* mobile menu */}

      <div className='flex gap-6 py-2'>
        <button
          onClick={() => handleClick('/')}
          className={`menuLink commonPropBtn ${
            location.pathname === '/' ? 'active' : ''
          }`}
        >
          <img
            className='menu-svg scale-110 '
            src='src\assets\HomeMenu.svg'
            alt='Home Icon'
          />
          <h1 className='font-semibold'>Home</h1>
        </button>
        <button
          onClick={() => handleClick('/supplierMill')}
          className={`menuLink commonPropBtn ${
            location.pathname === '/supplierMill' ? 'active' : ''
          }`}
        >
          <img
            className='menu-svg scale-110'
            src='src\assets\supplierMill.svg'
            alt='supplierMill Icon'
          />
          <h1 className='font-semibold'>Supplier Mill</h1>
        </button>
        <button
          onClick={() => handleClick('/supplierPlantation')}
          className={`menuLink commonPropBtn ${
            location.pathname === '/supplierPlantation' ? 'active' : ''
          }`}
        >
          <img
            className='menu-svg menu-svg scale-110  filter hover:invert'
            src='src\assets\supplierPlantation.svg'
            alt='supplierPlantation Icon'
          />
          <h1 className='font-semibold'>Supplier Plantation</h1>
        </button>
        <button
          onClick={() => handleClick('/reporting')}
          className={`menuLink commonPropBtn ${
            location.pathname === '/reporting' ? 'active' : ''
          }`}
        >
          <img
            className='menu-svg scale-110  hover:fill-white'
            src='src\assets\Reporting.svg'
            alt='Reporting Icon'
          />
          <h1 className='font-semibold'>Reporting</h1>
        </button>
      </div>
    </div>
  );
}
export default Menu;
