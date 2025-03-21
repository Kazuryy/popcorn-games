import React, { useState } from 'react';
import axios from 'axios';

function Play() {
    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState(null);

    return (
        <div className="flex flex-col items-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white p-7 rounded-lg shadow-md mt-30">
                <h1 className="text-3xl font-bold text-center mb-6">Créer une partie</h1>

                {/* Username avec `name` et `autocomplete` pour Bitwarden */}
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Nom d'utilisateur
                </label>
                <input 
                    type="text"
                    name="username"  // ✅ Bitwarden reconnaît mieux ce champ
                    id="username"
                    required
                    placeholder="Nom d'utilisateur"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength="3"
                    maxLength="30"
                    title="Seuls les lettres, chiffres et tirets sont autorisés"
                    autoComplete="username"  // ✅ Bitwarden comprend que c'est un login
                    className="w-full bg-transparent focus:outline-none border px-3 py-2 rounded-md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Bouton de connexion */}
                <button className="btn btn-neutral w-full mt-4">Rejoindre</button>

                {gameId && <p className="mt-4">Game ID: {gameId}</p>}
            </div>
        </div>
    );
}

export default Play;