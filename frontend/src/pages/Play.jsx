import React, { useState } from 'react';
import axios from 'axios';

function Play() {
    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState(null);

    const handleCreateGame = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/create_game/');
            setGameId(response.data.game_id);
            // Vous pouvez également rediriger l'utilisateur vers la page de la partie
            // window.location.href = `/game/${response.data.game_id}`;
        } catch (error) {
            console.error('There was an error creating the game!', error);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white p-7 rounded-lg shadow-md mt-30">
                <h1 className="text-3xl font-bold text-center mb-6">Créer une partie</h1>

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
                        placeholder="Username" 
                        pattern="[A-Za-z][A-Za-z0-9\-]*" 
                        minLength="3" 
                        maxLength="30" 
                        title="Only letters, numbers, or dash" 
                        className="w-full bg-transparent focus:outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                {/* Create Game Button */}
                <button className="btn btn-neutral w-full mt-4" onClick={handleCreateGame}>Créer une partie</button>

                {gameId && <p className="mt-4">Game ID: {gameId}</p>}
            </div>
        </div>
    );
}

export default Play;