import React from 'react';
import Page from '../components/Page';

function Team() {
  return (
      <div className="flex flex-col  items-center  bg-gray-100 px-4">
          <div className="w-full max-w-sm bg-white p-7 rounded-lg shadow-md mt-10">
              <h1 className="text-3xl font-bold text-center mb-6">Créer un joueur</h1>

              {/* Username */}
              <label className="input input-bordered flex items-center gap-2 w-full mb-3">
                  <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                      </g>
                  </svg>
                  <input 
                      type="text" 
                      required 
                      placeholder="Team name" 
                      pattern="[A-Za-z][A-Za-z0-9\-]*" 
                      minLength="3" 
                      maxLength="30" 
                      title="Only letters, numbers, or dash" 
                      className="w-full bg-transparent focus:outline-none"
                  />
              </label>

              {/* Login Button */}
              <button className="btn btn-neutral w-full mt-4">Jouer</button>
          </div>
      </div>
  );
}

export default Team;