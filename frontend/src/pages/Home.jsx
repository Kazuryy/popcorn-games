import React from 'react';
import Card from '../components/Card';
import Page from '../components/Page';
import imagetunnel from '../assets/tunnel.png';
import imagemots from '../assets/les-mots-interdits.png';

function Home() {
  return (
    <Page>
      <div className='pt-6'>
        <div className="container mx mt-4 ">
          <h1 className="text-4xl font-bold text-center">Jouer aux jeux de Popcorn avec ses amis</h1>
          <p className="text-center mt-4">Choisis un jeu pour commencer à jouer avec tes amis.</p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="btn btn-primary">Rejoindre une partie</button>
            <button className="btn btn-secondary">Créer un joueur</button>
          </div>
          
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