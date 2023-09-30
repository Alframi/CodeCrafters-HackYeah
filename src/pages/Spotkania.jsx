import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styles from './Spotkania.module.css';

const Spotkania = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Sesje');
  };

  return (
    <div>
      <h2 className={styles.naglowek}>Spotkania</h2>
      <div className={styles.kategorie}>
        <span>Lista</span>
        <span className={styles.dzielenie}>|</span>
        <button className={styles.buttonMap}
        onClick={handleButtonClick}>Mapa</button>
      </div>
    </div>
  );
};

export default Spotkania;
