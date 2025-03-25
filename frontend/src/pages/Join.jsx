import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function JoinGame() {
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleValidateCode = async () => {
        setError('');

        if (!/^\d{6}$/.test(code)) {
            setError("Veuillez entrer un code à 6 chiffres.");
            return;
        }

        if (!username.trim()) {
            setError("Veuillez entrer un pseudo.");
            return;
        }

        try {
            // 1️⃣ On récupère le gameId à partir du code
            const response = await axios.get(
                `/api/games/by-code/${code}/`,
                { withCredentials: true }
            );

            const gameId = response.data.game_id;
            Cookies.set("gameId", gameId, { expires: 1 });

            // 2️⃣ On envoie le pseudo pour rejoindre la partie
            await axios.post(
                `/api/games/${gameId}/join/`,
                { username },
                { withCredentials: true }
            );

            // 3️⃣ Redirection vers la salle d’attente
            navigate("/play");
        } catch (err) {
            console.error(err);
            setError("Code invalide ou partie introuvable.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen justify-start bg-gray-100 px-4 py-10">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Rejoindre une partie</h1>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code à 6 chiffres :
                </label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="input input-bordered w-full mb-4"
                    placeholder="Ex: 123456"
                    autoComplete="off"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pseudo :
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20}
                    className="input input-bordered w-full"
                    placeholder="Ex: SuperJoueur"
                    autoComplete="off"
                />

                <button className="btn btn-primary w-full mt-4" onClick={handleValidateCode}>
                    Rejoindre la partie
                </button>

                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
        </div>
    );
}

export default JoinGame;