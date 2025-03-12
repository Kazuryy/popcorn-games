import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function MenuButton() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      {menuVisible && (
        <ul className="menu bg-gray-200 rounded-box w-56 mt-2 ml-4 absolute left-0 top-full">
          <li><Link to="/tunnel" onClick={toggleMenu}>Tunnel</Link></li>
          <li><Link to="/team" onClick={toggleMenu}>Team</Link></li>
        </ul>
      )}
    </div>
  );
}

export default MenuButton;