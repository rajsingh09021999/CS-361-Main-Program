import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPinIcon, MenuIcon } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'WalkCity';
      case '/map':
        return 'Walkability Map';
      case '/record-route':
        return 'Record Route';
      case '/report-issue':
        return 'Report Issue';
      default:
        return 'WalkCity';
    }
  };

  return <header className="bg-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPinIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">{getTitle()}</h1>
        </Link>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 rounded-full hover:bg-teal-700">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className={`absolute top-14 right-0 left-0 bg-teal-600 shadow-md md:shadow-none z-50 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'} md:static md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            <li className={location.pathname === '/' ? 'font-bold' : ''}>
              <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 md:py-0 hover:text-teal-200">
                Home
              </Link>
            </li>
            <li className={location.pathname === '/map' ? 'font-bold' : ''}>
              <Link to="/map" onClick={() => setMenuOpen(false)} className="block py-2 md:py-0 hover:text-teal-200">
                Map
              </Link>
            </li>
            <li className={location.pathname === '/record-route' ? 'font-bold' : ''}>
              <Link to="/record-route" onClick={() => setMenuOpen(false)} className="block py-2 md:py-0 hover:text-teal-200">
                Record Route
              </Link>
            </li>
            <li className={location.pathname === '/report-issue' ? 'font-bold' : ''}>
              <Link to="/report-issue" onClick={() => setMenuOpen(false)} className="block py-2 md:py-0 hover:text-teal-200">
                Report Issue
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>;
};

export default Header;