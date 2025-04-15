import React, { useState } from 'react';
import pokeball from '../images/pokeball.png';
import bg from '../images/bg.jpg';
import './Modal.css';

function Modal({
  onClick,
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
  const [isShiny, setIsShiny] = useState(false);

  function handleShiny() {
    setIsShiny(!isShiny);
  }

  return (
    <div
      className="modal-container"
      style={{
        zIndex: '1002',
        position: 'fixed',
        display: 'flex',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="modal-close"
        onClick={onClick}
        style={{
          position: 'absolute',
          top: '50px',
          right: '50px',
          borderRadius: '50%',
          padding: '5px 10px',
          background: 'black',
          color: 'white',
          fontWeight: '900',
          cursor: 'pointer',
          zIndex: '1003',
        }}
      >
        X
      </div>
      <div>
        {!isShiny ? (
          <img
            src={image}
            alt={name}
            style={{ filter: 'drop-shadow(2px 4px 12px black)' }}
          />
        ) : (
          <img
            src={imageShiny}
            alt={name}
            style={{ filter: 'drop-shadow(2px 4px 12px black)' }}
          />
        )}
      </div>
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'column',
          width: '450px',
          height: '500px',
        }}
      >
        <div className="stat-container-title" style={{ marginLeft: '0' }}>
          <img src={image} alt={name} className="img-title" />
          <p style={{ width: '180px', color: 'black' }}>No. {id}</p>
          <p>{name}</p>
          <img src={pokeball} alt="pokeball" className="pokeball-title" />
        </div>
        
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            className="stats-left"
            style={{
              background: '#dbdbd9',
              textAlign: 'center',
              lineHeight: '40px',
            }}
          >
            <p>Type</p>
            <p>Height</p>
            <p>Weight</p>
          </div>
          <div
            className="stats-right"
            style={{ background: '#ffffff', lineHeight: '40px' }}
          >
            <p>{type}</p>
            <p>{height}0 cm</p>
            <p>{weight} lbs</p>
          </div>
        </div>
        <div className="base-stats">
          <div>
            {statsName.map((statName, index) => (
              <p className="stats" style={{ lineHeight: '60px' }} key={`modal-stat-name-${index}`}>
                {statName}
              </p>
            ))}
          </div>
          <div>
            {stats.map((stat, index) => (
              <p className="stats" style={{ lineHeight: '60px' }} key={`modal-stat-value-${index}`}>
                {stat}
              </p>
            ))}
          </div>
        </div>
        <button onClick={handleShiny} className="shiny-btn">
          Shiny
        </button>
      </div>
    </div>
  );
}

export default Modal;