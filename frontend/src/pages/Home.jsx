import React, { useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Page from '../components/Page';
import imagetunnel from '../assets/tunnel.png';
import imagemots from '../assets/les-mots-interdits.png';

function Home() {
  const [gameId, setGameId] = useState(null);

  const handleCreateGame = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/create_game/');
      setGameId(response.data.game_id);
      // Vous pouvez également rediriger l'utilisateur vers la page de la partie
      // window.location.href = `/game/${response.data.game_id}`;
    } catch (error) {
      console.error('There was an error creating the game!', error);
    }
  };

  return (
    <Page>
      <div className='pt-6'>
        <div className="container mx mt-4">
          <h1 className="text-4xl font-bold text-center">Jouer aux jeux de Popcorn avec ses amis</h1>
          <p className="text-center mt-4">Choisis un jeu pour commencer à jouer avec tes amis.</p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="btn btn-primary">Rejoindre une partie</button>
            <button className="btn btn-secondary" onClick={handleCreateGame}>Créer une partie</button>
          </div>
          {gameId && <p className="text-center mt-4">Game ID: {gameId}</p>}
        </div>
        
        <hr className="my-8 border-gray-300" />
        <div className="flex flex-wrap gap-4 justify-center">
          <Card
            image={imagetunnel}
            title="Le Tunnel"
            description="Trouve la bonne réponse et choisis entre prendre tes points et continuer de trouver les réponses dans ton tunnel."
            buttonText="Jouer"
            to="/tunnel"
          />
          <Card
            image={imagemots}
            title="Les Mots Interdits"
            description="Trouve le mot de ton partenaire sans dire l'un des mots interdits."
            buttonText="Jouer"
            to="/team"
          />
          {/* Ajoutez d'autres cartes ici */}
        </div>
      </div>
    </Page>
  );
}

export default Home;