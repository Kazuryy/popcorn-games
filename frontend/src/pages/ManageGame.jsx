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
    const confirmQuit = window.confirm("Êtes-vous sûr de vouloir supprimer cette partie ?");
    if (!confirmQuit) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/games/${gameId}/delete/`,
        { withCredentials: true }  // ✅ Assure que les cookies sont bien envoyés
      );
  
      if (response.status === 200) {
        alert("✅ Partie supprimée !");
        Cookies.remove("gameId");
        navigate("/");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la suppression :", error);
      alert("Une erreur est survenue.");
    }
  };

  if (!game) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Gestion de la Partie</h2>
      <p>Game ID: {gameId}</p>
      <p>Titre : {game.title || "Titre non disponible"}</p>
      <p>Date de création : {new Date(game.created_at).toLocaleString()}</p>
      <button className="btn btn-danger" onClick={handleQuitGame}>
        Quitter la Partie
      </button>
    </div>
  );
};

export default ManageGame;