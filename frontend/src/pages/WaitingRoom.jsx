import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function WaitingRoom() {
    const [players, setPlayers] = useState([]);
    const [creatorId, setCreatorId] = useState(null);
    const gameId = Cookies.get("gameId");
    const [code, setCode] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const [gameRes, playersRes] = await Promise.all([
                    axios.get(`http://localhost:8000/api/games/${gameId}/`, { withCredentials: true }),
                    axios.get(`http://localhost:8000/api/games/${gameId}/players/`, { withCredentials: true }),
                ]);
                setCode(gameRes.data.code);
                setCreatorId(gameRes.data.creator_id);  // ✅ Voilà le lien direct
                setPlayers(playersRes.data.players);
            } catch (error) {
                console.error("❌ Erreur lors de la récupération des données :", error);
            }
        };

        fetchPlayers();
        const interval = setInterval(fetchPlayers, 5000);
        return () => clearInterval(interval);
    }, [gameId]);

    // 🔎 Séparer le MJ des autres joueurs
    const master = players.find(p => p.player_id === creatorId);
    const others = players.filter(p => p.player_id !== creatorId);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 py-10">
            <h1 className="text-4xl font-bold mb-6 text-center">En attente du prochain jeu...</h1>
            <p className="text-center text-gray-700 text-sm mb-4">
                🔐 Code de la partie : <span className="font-mono font-bold">{code}</span>
            </p>
            <p className="text-lg mb-4 text-gray-700 text-center">Joueurs connectés :</p>

            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                {master && (
                    <div className="mb-4 text-center font-semibold text-blue-600">
                        👑 Game Master : {master.username}
                    </div>
                )}

                <ul className="space-y-2">
                    {others.length > 0 ? (
                        others.map((player, index) => (
                            <li key={index} className="bg-gray-50 px-4 py-2 rounded-md text-center">
                                👤 {player.username}
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-500">Aucun autre joueur pour l’instant…</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default WaitingRoom;