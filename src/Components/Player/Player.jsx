import React from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';
import Cards_data from '../../assets/cards/Cards_data';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the card data using the id
  const cardData = Cards_data.find((card) => card.id === id);

  if (!cardData) {
    return <div>Video not found!</div>; // Handle invalid ids
  }

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-icon"
        onClick={() => navigate(-1)} // Navigate back
      />
      <iframe
        width="90%"
        height="90%"
        src={`${cardData.url.replace("watch?v=", "embed/")}?autoplay=0&rel=0&showinfo=0`}
        title={cardData.name}
        frameBorder="0"
        allowFullScreen
        rel="0"
        controls="0"
        autoplay="0"
      ></iframe>
      <div className="player-info">
        <p>{cardData.published_at}</p>
        <p>{cardData.name}</p>
        <p>{cardData.type}</p>
      </div>
    </div>
  );
};

export default Player;
