// PokemonCard.jsx - Updated to include hover instructions
import React, { useState, useEffect } from 'react';
import './PokemonCard.css';
import pokeball from '../images/pokeball.png';
import Modal from './Modal';

function PokemonCard({
  id,
  name,
  image,
  imageShiny,
  type,
  height,
  weight,
  stats,
  statsName,
}) {
  const [isShown, setIsShown] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [anyCardHovered, setAnyCardHovered] = useState(false);

  function modalHandler() {
    setModalIsOpen(true);
  }
  
  function closeModalHandler() {
    setModalIsOpen(false);
  }

  // Function to check if device is mobile
  const isMobile = () => window.innerWidth <= 768;

  // Handle hover status to show/hide the instructions
  const handleMouseEnter = () => {
    if (!isMobile()) {
      setIsShown(true);
      setAnyCardHovered(true);
      // Notify parent that a card is hovered (using custom event)
      window.dispatchEvent(new CustomEvent('pokemonHoverChange', { detail: { hovered: true } }));
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile()) {
      setIsShown(false);
      setAnyCardHovered(false);
      // Notify parent that card is no longer hovered
      window.dispatchEvent(new CustomEvent('pokemonHoverChange', { detail: { hovered: false } }));
    }
  };

  return (
    <div className="container">
      {isShown && !isMobile() && (
        <div className="show">
          <div className="stat-container-title">
            <img src={image} alt={name} className="img-title" />
            <p style={{ width: '180px', color: 'black' }}>No. {id}</p>
            <p>{name}</p>
            <img src={pokeball} alt="pokeball" className="pokeball-title" />
          </div>
          <img src={image} alt={name} />
          
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              className="stats-left"
              style={{ background: '#dbdbd9', textAlign: 'center' }}
            >
              <p>Type</p>
              <p>Height</p>
              <p>Weight</p>
            </div>
            <div className="stats-right" style={{ background: '#ffffff' }}>
              <p>{type}</p>
              <p>{height}0 cm</p>
              <p>{weight} lbs</p>
            </div>
          </div>
          <div className="base-stats">
            <div>
              {statsName.map((stats, index) => (
                <p className="stats" key={`stat-name-${index}`}>{stats}</p>
              ))}
            </div>
            <div>
              {stats.map((stat, index) => (
                <p className="stats" key={`stat-value-${index}`}>{stat}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      <div
        className="right"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={modalHandler}
      >
        <img
          src={image}
          alt={name}
          style={{ maxHeight: '50px', marginRight: '10px', width: '50px' }}
        />
        <p style={{ width: '270px' }}>No. {id}</p>
        <p>{name}</p>
        <img
          src={pokeball}
          alt="pokeball"
          style={{ marginLeft: 'auto', width: '40px' }}
        />
      </div>
      {modalIsOpen && (
        <Modal
          id={id}
          name={name}
          image={image}
          imageShiny={imageShiny}
          type={type}
          height={height}
          weight={weight}
          stats={stats}
          statsName={statsName}
          onClick={closeModalHandler}
        />
      )}
    </div>
  );
}

export default PokemonCard;