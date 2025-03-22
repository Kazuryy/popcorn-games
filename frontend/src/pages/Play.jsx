import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Play() {
    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState(Cookies.get("gameId") || null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const validateUsername = (name) => {
        const regex = /^[A-Za-z][A-Za-z0-9\-]{2,29}$/; // commence par une lettre, puis lettres/chiffres/-
        return regex.test(name);
    };

    const handleJoin = async () => {
        if (!validateUsername(username)) {
          setError("Le pseudo doit contenir entre 3 et 30 caractères : lettres, chiffres ou tirets uniquement.");
          return;
        }
      
        try {
          await axios.post(
            `http://localhost:8000/api/games/${gameId}/join/`,
            { username },
            { withCredentials: true }
          );
          navigate('/waiting-room');
        } catch (error) {
          console.error("❌ Erreur lors de la tentative de rejoindre :", error);
          setError("Impossible de rejoindre la partie.");
        }
      };

      return (
        <div className="flex flex-col items-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white p-7 rounded-lg shadow-md mt-30">
                <h1 className="text-3xl font-bold text-center mb-6">Rejoindre une partie</h1>
    
                {/* Champ pseudo */}
                <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700">
                    Ton pseudo
                </label>
                <input 
                    type="text"
                    name="fake-name"
                    id="pseudo"
                    placeholder="Pseudo"
                    required
                    autoComplete="off"
                    title="Seuls les lettres, chiffres et tirets sont autorisés"
                    className={`w-full bg-transparent focus:outline-none border px-3 py-2 rounded-md ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (error) setError('');
                    }}
                />
    
                <button className="btn btn-neutral w-full mt-4" onClick={handleJoin}>
                    Rejoindre
                </button>
    
                {/* Message d'erreur en dessous du bouton */}
                {error && (
                    <div className="text-red-600 text-sm font-medium mt-3 text-center">
                        {error}
                    </div>
                )}
    
                {gameId && <p className="mt-4 text-center text-sm text-gray-500">ID de la partie : {gameId}</p>}
            </div>
        </div>
    );
}

export default Play;