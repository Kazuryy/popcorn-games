import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const ListGames = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("http://localhost:8000/api/games/");
      setGames(response.data.games);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des parties :", err);
      setError("Impossible de récupérer les parties. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (loading) return <p>Chargement des parties...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Liste des Parties</h2>
      <button className="btn btn-primary mb-3" onClick={fetchGames}>
        🔄 Recharger
      </button>
      
      {games.length === 0 ? (
        <p>Aucune partie disponible.</p>
      ) : (
        <ul className="list-group">
          {games.map((game) => (
            <li key={game.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>🆔 {game.id} - 📅 {new Date(game.created_at).toLocaleString()}</span>
              <button className="btn btn-success" onClick={() => navigate(`/game/${game.id}`)}>
                🔥 Rejoindre
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListGames;