import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalPrice } = useContext(StoreContext);

  return (
    <div className="w-full">
      <header className="text-gray-600 body-font sticky top-0 bg-white z-50 ">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src={assets.logo} alt="Logo" />
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`mr-5 hover:text-gray-900 capitalize cursor-pointer transition-all ease-in ${menu === 'home' ? 'underline' : ''}`}
            >
              Home
            </Link>
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={`mr-5 hover:text-gray-900 capitalize cursor-pointer transition-all ease-in ${menu === 'menu' ? 'underline' : ''}`}
            >
              Menu
            </a>
            <a
              href="#footer"
              onClick={() => setMenu("contact us")}
              className={`mr-5 hover:text-gray-900 capitalize cursor-pointer transition-all ease-in ${menu === 'contact us' ? 'underline' : ''}`}
            >
              Contact Us
            </a>
          </nav>
          <div className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 gap-9">
            <img src={assets.search_icon} alt="Search" />
            <div className="relative">
              <Link to="/cart">
                <img src={assets.basket_icon} alt="Basket" />
              </Link>
              <div className={`${getTotalPrice() > 0 ? '' : 'hidden'} dot absolute min-w-[10px] min-h-[10px] bg-[#ff6347] rounded-full top-[-8px] right-[-8px]`}></div>
            </div>
            <button
              onClick={() => setShowLogin(true)}
              className="inline-flex text-white bg-[#ff6347] border-0 py-2 px-6 focus:outline-none hover:bg-[#df2a0a] transition-all ease-in rounded-full text-lg"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
