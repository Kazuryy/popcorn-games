import React from 'react';
import { Link } from 'react-router-dom';

function NavLinks() {
  return (
    <>
    
      <Link to="/team" className="btn btn-ghost">Team</Link>
      
      <Link to="/profile" className="btn btn-circle btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
      </Link>

    </>
  );
}

export default NavLinks;