import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState(Cookies.get("gameId") || null);
    const [isMaster, setIsMaster] = useState(false);
    const navigate = useNavigate();

    // Charger les infos du joueur
    useEffect(() => {
        const fetchGame = async () => {
            try {
                if (!gameId) return;
                const response = await axios.get(
                    `http://localhost:8000/api/games/${gameId}/`,
                    { withCredentials: true }
                );
                setIsMaster(response.data.is_master);
            } catch (error) {
                console.error("❌ Erreur lors de la récupération de la partie :", error);
            }
        };
        fetchGame();
    }, [gameId]);

    // 🔧 Modifier le pseudo du joueur dans la partie actuelle
    const handleChangeUsername = async () => {
        if (!username.trim()) return alert("Pseudo invalide.");

        try {
            await axios.put(
                `http://localhost:8000/api/games/${gameId}/update_username/`,
                { username },
                { withCredentials: true }
            );
            alert("✅ Pseudo mis à jour !");
        } catch (error) {
            console.error("❌ Erreur lors du changement de pseudo :", error);
            alert("Erreur lors du changement de pseudo.");
        }
    };

    // 🔧 Quitter la partie actuelle
    const handleLeaveGame = async () => {
        const confirmLeave = window.confirm("Souhaites-tu vraiment quitter la partie ?");
        if (!confirmLeave) return;

        try {
            const url = isMaster
                ? `http://localhost:8000/api/games/${gameId}/delete/`   // MJ → supprime la partie
                : `http://localhost:8000/api/games/${gameId}/leave/`;    // joueur → quitte la partie

            await axios.delete(url, { withCredentials: true });

            Cookies.remove("gameId");
            alert("🚪 Tu as quitté la partie.");
            navigate("/");
        } catch (error) {
            console.error("❌ Erreur lors de la sortie de la partie :", error);
            alert("Erreur lors de la sortie.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 px-4 py-10">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Mon Profil</h1>

                <label className="block mb-2 text-sm font-medium text-gray-700">Changer de pseudo :</label>
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-md mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nouveau pseudo"
                />

                <button onClick={handleChangeUsername} className="btn btn-primary w-full mb-4">
                    Mettre à jour
                </button>

                {gameId && (
                    <button onClick={handleLeaveGame} className="btn btn-error w-full">
                        Quitter la partie
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;