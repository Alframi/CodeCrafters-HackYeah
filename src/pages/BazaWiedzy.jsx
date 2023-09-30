import React, { useEffect, useState } from 'react';
import styles from './BazaWiedzy.module.css';

const localStorageKey = 'dupa';

const BazaWiedzy = () => {
  const [informacje, setInformacje] = useState([]);
  const [nowaInformacja, setNowaInformacja] = useState('');

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setInformacje(data);
  }, []); // Dodaj pustą tablicę jako drugi argument, aby useEffect uruchamiał się tylko raz

  const dodajInformacje = () => {
    // Dodaj nową informację do stanu 'informacje'

    const newInfo = [...informacje, nowaInformacja];

    window.localStorage.setItem(localStorageKey, JSON.stringify(newInfo));

    setInformacje(newInfo);
    // Wyczyść pole tekstowe
    setNowaInformacja('');
  };

  return (
    <div className={styles.bazaWiedzy}>
      <h2 className={styles.naglowek}>Baza Wiedzy</h2>
      <div className={styles.kategorie}>
        <span>Zwierzęta</span>
        <span className={styles.dzielenie}>|</span>
        <span>Artykuły</span>
      </div>
      <ul className={styles.listaInformacji}>
        {informacje.map((info, index) => (
          <li key={index}>{info}</li>
        ))}
      </ul>
      <div className={styles.inputWithIcon}>
        <input
          className={styles.inputInformacji}
          type="text"
          placeholder="wyszukaj zwierzę"
          value={nowaInformacja}
          onChange={e => setNowaInformacja(e.target.value)}
        />
        <button className={styles.dodajButton} onClick={dodajInformacje}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5V7H15a.5.5 0 0 1 0 1H8.5v4.5a.5.5 0 0 1-1 0V8H1a.5.5 0 0 1 0-1h6.5V2.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BazaWiedzy;
