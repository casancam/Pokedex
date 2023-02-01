import './TopBar.css';
import pokeball from '../images/pokeball.png';
import pokeballcolor from '../images/pokeballcolor.png';

function TopBar() {
  return (
    <div className="title">
      <div className="title__left">
        <p>Carlos' Pokédex</p>
        <div className="caught-seen">
          <div className="caught">
            <img
              src={pokeballcolor}
              alt="pokeball"
              style={{ width: '30px', marginRight: '10px' }}
            />
            <p>68</p>
          </div>
          <div className="seen">
            <img
              src={pokeball}
              alt="pokeball"
              style={{ width: '30px', marginRight: '10px' }}
            />
            <p>151</p>
          </div>
        </div>
      </div>
      <p style={{ color: 'white' }}>A -&gt; Z</p>
    </div>
  );
}

export default TopBar;
