import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Card from "../components/Card";
import Page from "../components/Page";
import imagetunnel from "../assets/tunnel.png";
import imagemots from "../assets/les-mots-interdits.png";

function Home() {
  const [gameId, setGameId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGameId = Cookies.get("gameId");
    if (storedGameId) {
      setGameId(storedGameId);
      /* console.log("✅ Cookie détecté au chargement :", storedGameId); */
    }
  }, []);

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