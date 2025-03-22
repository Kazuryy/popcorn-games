import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Card from "../components/Card";
import Page from "../components/Page";
import imagetunnel from "../assets/tunnel.png";
import imagemots from "../assets/les-mots-interdits.png";

function Home() {
  const [gameId, setGameId] = useState(null);
  const [games, setGames] = useState([]); // ✅ Stocke les parties
  const [showGamesList, setShowGamesList] = useState(false); // ✅ Affiche la liste des parties
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGameId = Cookies.get("gameId");
    if (storedGameId) {
      setGameId(storedGameId);
      /* console.log("✅ Cookie détecté au chargement :", storedGameId); */
    }
  }, []);

  const handleCreateGame = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/create_game/",
        {}, // pas besoin de body, le backend gère "Game Master"
        { withCredentials: true } // pour que le cookie playerId soit envoyé
      );
  
      const gameId = response.data.game_id;
  
      // ✅ stocker le gameId dans les cookies pour usage ultérieur
      Cookies.set("gameId", gameId, { expires: 1 });
  
      // ✅ redirection vers la salle d'attente
      navigate("/waiting-room");
  
    } catch (error) {
      console.error("❌ Erreur lors de la création de la partie :", error);
      alert("Erreur lors de la création de la partie. Réessaye !");
    }
  };

  const handleShowGames = async () => {
    setShowGamesList(true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:8000/api/games/");
      setGames(response.data.games);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des parties :", err);
      setError("Impossible de récupérer les parties.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async (gameId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/games/${gameId}/`,
        { withCredentials: true }  // ✅ Envoie et récupère `playerId`
      );
  
      Cookies.set("gameId", gameId, { expires: 1 });
  
      console.log("🎉 Rejoint la partie :", gameId);
      navigate("/play");
    } catch (error) {
      console.error("❌ Erreur lors de la connexion à la partie :", error);
    }
  };

  return (
    <Page>
      <div className='pt-6'>
        <div className="container mx mt-4">
          <h1 className="text-4xl font-bold text-center">Jouer aux jeux de Popcorn avec ses amis</h1>
          <p className="text-center mt-4">Choisis un jeu pour commencer à jouer avec tes amis.</p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="btn btn-primary" onClick={() => navigate("/join")}>Rejoindre une partie</button>
            <button className="btn btn-secondary" onClick={() => navigate("/create-game")}>Créer une partie</button>
          </div>

          {gameId && <p className="text-center mt-4">🔥 Partie en cours : {gameId}</p>}
        </div>

        <hr className="my-8 border-gray-300" />
        <div className="flex flex-wrap gap-4 justify-center">
          <Card
            image={imagetunnel}
            title="Le Tunnel"
            description="Trouve la bonne réponse et choisis entre prendre tes points et continuer de trouver les réponses dans ton tunnel."
            buttonText="Plus d'infos"
            to="/tunnel"
          />
          <Card
            image={imagemots}
            title="Les Mots Interdits"
            description="Trouve le mot de ton partenaire sans dire l'un des mots interdits."
            buttonText="Plus d'infos"
            to="/team"
          />
        </div>
      </div>
    </Page>
  );
}

export default Home;