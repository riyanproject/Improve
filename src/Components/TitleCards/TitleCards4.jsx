import React, { useRef, useEffect } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import Cards_data from '../../assets/cards/cards_data4';

const TitleCards4 = ({ title }) => {
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

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular Trailers'}</h2>
      <div className="card-list" ref={cardsRef}>
        {Cards_data.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards4;
