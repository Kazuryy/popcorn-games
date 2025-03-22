import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState(Cookies.get("gameId") || null);
  const [isMaster, setIsMaster] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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

  const validateUsername = (name) => /^[A-Za-z][A-Za-z0-9\-]{2,29}$/.test(name);

  const handleChangeUsername = async () => {
    if (!validateUsername(username)) {
      setError("Pseudo invalide. 3 à 30 caractères, lettres/chiffres/tirets uniquement.");
      setSuccess('');
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/games/${gameId}/update_username/`,
        { username },
        { withCredentials: true }
      );
      setSuccess("✅ Pseudo mis à jour !");
      setError('');
    } catch (error) {
      console.error("❌ Erreur lors du changement de pseudo :", error);
      setError("Erreur lors du changement de pseudo.");
      setSuccess('');
    }
  };

  const handleLeaveGame = async () => {
    const confirmMsg = isMaster
      ? "Souhaites-tu vraiment supprimer cette partie ?"
      : "Souhaites-tu vraiment quitter la partie ?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const url = isMaster
        ? `http://localhost:8000/api/games/${gameId}/delete/`
        : `http://localhost:8000/api/games/${gameId}/leave/`;

      await axios.delete(url, { withCredentials: true });

      Cookies.remove("gameId");
      navigate("/");
    } catch (error) {
      console.error("❌ Erreur lors de la sortie de la partie :", error);
      setError("Impossible de quitter la partie.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 px-4 py-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">👤 Mon Profil</h1>

        {!gameId ? (
          <div className="text-center text-gray-600">
          <p className="mb-4">🚫 Tu n’as pas encore rejoint de partie.</p>
          <div className="flex flex-col gap-3">
            <button className="btn btn-primary" onClick={() => navigate('/join')}>
              🔑 Rejoindre une partie
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/create-game')}>
              ✨ Créer une partie
            </button>
          </div>
        </div>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">Changer de pseudo :</label>
            <input
              type="text"
              className={`w-full border px-3 py-2 rounded-md mb-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
                setSuccess('');
              }}
              placeholder="Nouveau pseudo"
            />

            <button onClick={handleChangeUsername} className="btn btn-primary w-full mb-3">
              Mettre à jour
            </button>

            {success && <p className="text-green-600 text-sm text-center mb-2">{success}</p>}
            {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}

            {isMaster ? (
              <>
                <button
                  className="btn btn-outline btn-warning w-full mb-3"
                  onClick={() => navigate('/game-settings')}
                >
                  ⚙️ Paramètres de la partie
                </button>
                <button
                  className="btn btn-error w-full"
                  onClick={handleLeaveGame}
                >
                  ❌ Supprimer la partie
                </button>
              </>
            ) : (
              <button className="btn btn-outline w-full" onClick={handleLeaveGame}>
                🚪 Quitter la partie
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;