import React from 'react';
import { Link } from 'react-router-dom';

function Card({ image, title, description, buttonText, to }) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          {to ? (
            <Link to={to} className="btn btn-accent">{buttonText}</Link>
          ) : (
            <button className="btn btn-accent">{buttonText}</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;