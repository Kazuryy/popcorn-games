import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function WaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [creatorId, setCreatorId] = useState(null);
  const [code, setCode] = useState(null);
  const [isMaster, setIsMaster] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();
  const gameId = Cookies.get("gameId");

  const kickPlayer = async (playerId) => {
    try {
      const res = await fetch(`/api/kick/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ envoie les cookies (playerId)
        body: JSON.stringify({
          game_code: code,
          player_id: playerId,
          requester_id: currentUserId,
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erreur brute :", errorText);
        throw new Error(`Échec du kick : ${res.status}`);
      }
  
      const data = await res.json();
  
      if (data.success) {
        const response = await axios.get(`/api/games/${gameId}/players/`, {
          withCredentials: true,
        });
        setPlayers(response.data.players);
      } else {
        alert(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      console.error("Erreur lors du kick :", err);
      alert(`Erreur lors du kick : ${err.message}`);
    }
  };

  useEffect(() => {
    if (!gameId) {
      navigate('/');
      return;
    }

    const userId = Cookies.get("userId");
    setCurrentUserId(userId);

    const fetchGame = async () => {
      try {
        const gameRes = await axios.get(`/api/games/${gameId}/`, {
          withCredentials: true
        });

        setCreatorId(gameRes.data.creator_id);
        setCode(gameRes.data.code);
        setIsMaster(gameRes.data.is_master);
      } catch (error) {
        if (error.response?.status === 404) {
          Cookies.remove("gameId");
          navigate('/'); // 🔁 Redirection immédiate
        } else {
          console.error("Erreur inattendue :", error);
        }
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`/api/games/${gameId}/players/`, {
          withCredentials: true
        });
        setPlayers(response.data.players);

        // 👇 Si le joueur a été kické
        if (userId && response.data.players.length > 0) {
          const stillHere = response.data.players.find(p => p.player_id === userId);
          if (!stillHere) {
            Cookies.remove("gameId");
            alert("Vous avez été expulsé de la partie.");
            navigate('/');
          }
        }

      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs :", error);
      }
    };

    fetchGame();
    fetchPlayers();

    const interval = setInterval(() => {
      fetchGame();
      fetchPlayers();
    }, 5000);

    return () => clearInterval(interval);
  }, [gameId, navigate]);

  const master = players.find(p => p.player_id === creatorId);
  const others = players.filter(p => p.player_id !== creatorId);

  return (
    <div className="flex flex-col items-center min-h-screen justify-start bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

        <h1 className="text-2xl font-bold text-center mb-2">Salle d'attente</h1>

        {code && (
          <p className="text-sm text-center text-gray-600 mb-4">
            🔐 Code de la partie : <span className="font-mono font-bold">{code}</span>
          </p>
        )}

        {isMaster && (
          <div className="text-green-600 text-sm font-medium text-center mb-2">
            🧙‍♂️ Vous êtes le Maître du Jeu
            <div className="text-center mt-6">
              <button
                className="btn btn-outline btn-warning"
                onClick={() => navigate('/game-settings')}
              >
                ⚙️ Paramètres de la partie
              </button>
            </div>
          </div>
        )}

        {/* UI stylée des joueurs */}
        <div className="mt-6 space-y-4">

          {/* MJ */}
          {master && (
            <div className="border-2 border-yellow-400 bg-yellow-100 rounded-lg p-4 shadow-sm flex items-center gap-3">
              <span className="text-yellow-600 text-xl">👑</span>
              <div>
                <p className="text-sm text-gray-800 font-semibold">Maître du Jeu</p>
                <p className="text-lg font-bold text-yellow-800">{master.username}</p>
              </div>
            </div>
          )}

          {/* Joueurs */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">👥 Joueurs</h3>
            {others.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {others.map((player, i) => (
                  <div key={i} className="bg-gray-100 rounded-md p-3 shadow-sm flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🎮</span>
                      <span className="text-sm font-medium text-gray-800">{player.username}</span>
                    </div>
                    {isMaster && (
                      <button
                        onClick={() => kickPlayer(player.player_id)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        ❌ Kick
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="italic text-gray-400">En attente de joueurs...</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;