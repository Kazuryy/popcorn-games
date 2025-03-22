import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function CreateGame() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateUsername = (name) => {
        const regex = /^[A-Za-z][A-Za-z0-9\-]{2,29}$/;
        return regex.test(name);
    };

    const handleCreate = async () => {
        if (!validateUsername(username)) {
            setError("Ton pseudo doit contenir entre 3 et 30 caractères (lettres, chiffres ou tirets).");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/create_game/",
                { username },
                { withCredentials: true }
            );

            const gameId = response.data.game_id;
            Cookies.set("gameId", gameId, { expires: 1 });

            navigate("/waiting-room");

        } catch (err) {
            console.error("❌ Erreur lors de la création :", err);
            setError("Impossible de créer la partie. Réessaie.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen justify-start bg-gray-100 px-4 py-10">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Nom du Maître du Jeu</h1>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Choisis ton pseudo trop puissant :
                </label>
                <input
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    maxLength={30}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (error) setError('');
                    }}
                    className={`input input-bordered w-full mb-3 ${error ? 'border-red-500' : ''}`}
                    placeholder="Ex: MJ_Titan"
                />

                <button className="btn btn-primary w-full" onClick={handleCreate}>
                    Créer la partie
                </button>

                {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            </div>
        </div>
    );
}

export default CreateGame;