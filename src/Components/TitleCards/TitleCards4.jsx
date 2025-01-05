import React, { useRef, useState, useEffect } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import Cards_data from '../../assets/cards/cards_data4';

const TitleCards4 = ({ title }) => {
  const [cards, setCards] = useState(Cards_data);  // State to hold cards
  const cardsRef = useRef();

  // Scroll handler function
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener('wheel', handleWheel);

    return () => {
      currentCardsRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Handle favorite button click
  const toggleFavorite = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      )
    );
  };

  // Handle delete button click
  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular Trailers'}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <Link to={`/player/${card.id}`}>
              <img src={card.image} alt={card.name} />
            </Link>
            <p>{card.name}</p>
            <div className="card-buttons">
              <button
                className={`button-edit ${card.isFavorite ? 'favorite' : ''}`}
                onClick={() => toggleFavorite(card.id)}
              >
                {card.isFavorite ? '💖' : '❤︎'}
              </button>
              <button
                className="button-delete"
                onClick={() => deleteCard(card.id)}
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards4;
