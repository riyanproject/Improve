import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';
import Cards_data from '../../assets/cards/cards_data';

const Inventory = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const favoriteCards = Cards_data.filter((card) => favorites.includes(card.id));

  // Delete a card from favorites
  const deleteCard = (id) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1 className='inventory'>Inventory</h1>
      <div className='favourites'>
        <h2>Favourites</h2>
        <div className="card-list">
          {favoriteCards.length > 0 ? (
            favoriteCards.map((card) => (
              <div className="card" key={card.id}>
                <button className="inventory-button-delete" onClick={() => deleteCard(card.id)}>✖</button>
                <Link to={`/player/${card.id}`}>
                  <img src={card.image} alt={card.name} />
                </Link>
                <p>{card.name}</p>
              </div>
            ))
          ) : (
            <p>No favorites yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
