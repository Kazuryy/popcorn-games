import React from 'react';
import MenuButton from './MenuButton';
import Logo from './Logo';
import NavLinks from './NavLinks';

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none">
        <MenuButton />
      </div>
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-none">
        <NavLinks />
      </div>
    </div>
  );
}

export default Navbar;