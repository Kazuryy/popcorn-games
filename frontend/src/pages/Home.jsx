import React from 'react';
import Card from '../components/Card';
import Page from '../components/Page';

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
            image="https://korben.info/webtunnel-le-nouveau-pont-tor-deguise-en-trafic-web-pour-contourner-la-censure/manu23_web_tunnels_to_avoid_censorship_d72931de-dc11-4447-8692-d5fe3891b868.webp"
            title="Le Tunnel"
            description="Trouve la bonne réponse et choisis entre prendre tes points et continuer de trouver les réponses dans ton tunnel."
            buttonText="Jouer"
            to="/tunnel"
          />
          <Card
            image="https://www.radiofrance.fr/s3/cruiser-production/2020/12/0943738d-0301-4ddb-a8a7-c442e2bcccb0/1200x680_gettyimages-1164537342.webp"
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