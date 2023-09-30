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
      <h2>Baza Wiedzy</h2>
      <ul className={styles.listaInformacji}>
        {informacje.map((info, index) => (
          <li key={index}>{info}</li>
        ))}
      </ul>
      <input
        className={styles.inputInformacji}
        type="text"
        placeholder="Dodaj nową informację"
        value={nowaInformacja}
        onChange={e => setNowaInformacja(e.target.value)}
      />
      <button className={styles.dodajButton} onClick={dodajInformacje}>
        Dodaj
      </button>
    </div>
  );
};

export default BazaWiedzy;
