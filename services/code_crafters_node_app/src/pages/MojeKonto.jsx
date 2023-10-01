import React from 'react';
import styles from './MojeKonto.module.css';
import avatar from '../images/avatar.svg';

const MojeKonto = ({ nazwaUzytkownika, adresEmail }) => {
  return (
    <div className={styles.mojeKonto}>
      <div className={styles.avatar}>
        <img src={avatar} alt="spo-icon" />
      </div>
      <div className={styles.daneUzytkownika}>
        <h2>Jarek</h2>
        <p>Jarek.adress.pl</p>
      </div>
    </div>
  );
};

export default MojeKonto;
