import { useState } from 'react';
import '../../css/homepage/HomeNavbar.css';
function HomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='py-5 px-9 flex justify-between items-center'>
      <div>
        <img
          src='https://maps.agriplot.earth/assets/logolong-bbde4d32.png'
          alt='mainlogo'
          className='w-20'
        />
      </div>
      {/* Menu */}
      <div className='hidden lg:flex space-x-7'>
        <button className='font-semibold text-[#009CA0]'>Home</button>
        <button>Feature</button>
        <button>News</button>
        <button>About</button>
        <button>Testimonials</button>
        <button className='bg-[#009CA0] text-white px-5 py-2'>Login</button>
      </div>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`z-40 block focus:outline-none absolute right-4 top-4 lg:hidden
      hamburger ${isMenuOpen ? 'open' : ''}`}
      >
        <span className='hamburger-top'></span>
        <span className='hamburger-middle'></span>
        <span className='hamburger-bottom'></span>
      </button>
      {/* Mobile Menu */}
      <div
        className={`inset-0 opacity-90  bg-gray-950 absolute text-center border-b  pt-12 h-screen z-30 text-white ${
          isMenuOpen ? '' : 'hidden'
        }`}
      >
        <div className='border-b-2 border-b-[#009CA0] py-2'>
          <button className='uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 rounded-sm bg-[#009CA0] text-white mb-4 '>
            <span>login</span>
          </button>
        </div>
        <div className='border-b-2 border-b-[#009CA0] py-2'>
          <button className='mobileMenuButton '>
            <span>home</span>
          </button>
        </div>
        <div className='border-b-2 border-b-[#009CA0] py-2'>
          <button className='mobileMenuButton'>
            <span>feature</span>
          </button>
        </div>
        <div className='border-b-2 border-b-[#009CA0] py-2'>
          <button className='mobileMenuButton'>
            <span>news</span>
          </button>
        </div>
        <div className='border-b-2 border-b-[#009CA0] py-2'>
          <button className='mobileMenuButton'>
            <span>about</span>
          </button>
        </div>
        <div className=' py-2'>
          <button className='mobileMenuButton'>
            <span>Testimonials</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomeNavbar;
