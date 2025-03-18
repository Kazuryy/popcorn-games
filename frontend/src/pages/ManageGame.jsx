import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ManageGame = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  const gameId = Cookies.get("gameId");

  useEffect(() => {
    if (!gameId) {
      console.warn("⚠️ Aucune partie trouvée. Redirection...");
      navigate("/");  
      return;
    }

    axios.get(`http://localhost:8000/api/games/${gameId}`)
      .then(response => setGame(response.data))
      .catch(error => {
        console.error("❌ Erreur lors du chargement du jeu", error);
        Cookies.remove("gameId");
        navigate("/");
      });
  }, [gameId, navigate]);

  const handleQuitGame = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/games/${gameId}/delete/`);  // ✅ Supprime la partie
      Cookies.remove("gameId");  // ✅ Supprime le cookie
      navigate("/");  // ✅ Redirige vers la home
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de la partie :", error);
    }
  };

  if (!game) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Gestion de la Partie</h2>
      <p>Game ID: {gameId}</p>
      <p>Titre : {game.title}</p>
      <p>Date de création : {game.created_at}</p>
      <button className="btn btn-danger" onClick={handleQuitGame}>
        Quitter la Partie
      </button>
    </div>
  );
};

export default ManageGame;