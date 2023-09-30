import React, { Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Alerty from '../../pages/Alerty';
import BazaWiedzy from '../../pages/BazaWiedzy';
import MojeKonto from '../../pages/MojeKonto';
import Spotkania from '../../pages/Spotkania';
import styles from '../App/App.module.css';
import bazawiedzy from '../../images/bazawiedzy.svg';
import mojekonto from '../../images/mojekonto.svg';
import spotkania from '../../images/spotkania.svg';
import alerty from '../../images/alerty.svg';


const App = () => {
  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/Spotkania" className={styles.navLink}>
                <img src={spotkania} alt="spo-icon" />
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/Alerty" className={styles.navLink}>
                <img src={alerty} alt="spo-icon" />
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/Baza-Wiedzy" className={styles.navLink}>
                <img src={bazawiedzy} alt="spo-icon" />
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/Moje-Konto" className={styles.navLink}>
                <img src={mojekonto} alt="spo-icon" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/" />} />
            <Route path="/Alerty" element={<Alerty />} />
            <Route path="/Baza-Wiedzy" element={<BazaWiedzy />} />
            <Route path="/Moje-Konto" element={<MojeKonto />} />
            <Route path="/Spotkania" element={<Spotkania />} />
            <Route path="*" element={<Alerty />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
