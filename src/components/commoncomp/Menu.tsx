import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../css/common/Menu.css';
function Menu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClick(path: string) {
    navigate(path);
  }

  function handleMobileClick(path: string) {
    navigate(path);
    setIsMenuOpen(false);
  }
  return (
    <div className='bg-[#DFE9FF] py-0 px-6 relative '>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`z-30 block focus:outline-none absolute right-4 top-4 
      hamburger ${isMenuOpen ? 'open' : ''}`}
      >
        <span className='hamburger-top'></span>
        <span className='hamburger-middle'></span>
        <span className='hamburger-bottom'></span>
      </button>
      {/* mobile menu */}
      <div
        className={`inset-0 opacity-90  bg-gray-700 absolute text-center border-b  pt-12 h-screen z-20 text-white ${
          isMenuOpen ? '' : 'hidden'
        }`}
      >
        <div className='border-b-2 border-b-gray-400 py-2 '>
          <button
            className='mobileMenuBtn'
            onClick={() => handleMobileClick('/')}
          >
            <img
              className='menu-svg scale-110 filter invert inline-block px-2 pb-1 '
              src='src\assets\HomeMenu.svg'
              alt='Home Icon'
            />
            <span>home</span>
          </button>
        </div>
        <div className='border-b-2 border-b-gray-400 py-2'>
          <button
            className='mobileMenuBtn'
            onClick={() => handleMobileClick('/supplierMill')}
          >
            <img
              className='menu-svg scale-110 filter invert inline-block px-2 pb-1 '
              src='src\assets\supplierMill.svg'
              alt='Home Icon'
            />
            <span>Supplier Mill</span>
          </button>
        </div>
        <div className='border-b-2 border-b-gray-400 py-2'>
          <button
            className='mobileMenuBtn'
            onClick={() => handleMobileClick('/supplierPlantation')}
          >
            <img
              className='menu-svg scale-110 filter invert inline-block px-2 pb-1 '
              src='src\assets\supplierPlantation.svg'
              alt='Home Icon'
            />
            <span>Supplier Plantation</span>
          </button>
        </div>
        <div className='py-2'>
          <button
            className='mobileMenuBtn'
            onClick={() => handleMobileClick('/reporting')}
          >
            <img
              className='menu-svg scale-110 filter invert inline-block px-2 pb-1 '
              src='src\assets\reporting.svg'
              alt='Home Icon'
            />
            <span>Reporting</span>
          </button>
        </div>
      </div>
      <div className=' gap-6 py-2 hidden md:flex'>
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
