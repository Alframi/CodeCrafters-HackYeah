import React, { Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Alerty from '../../pages/Alerty';
import BazaWiedzy from '../../pages/BazaWiedzy';
import MojeKonto from '../../pages/MojeKonto';
import Spotkania from '../../pages/Spotkania';

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/Spotkania">Spotkania</Link>
            </li>
            <li>
              <Link to="/Alerty">Alerty</Link>
            </li>
            <li>
              <Link to="/Baza-Wiedzy">Baza Wiedzy</Link>
            </li>
            <li>
              <Link to="/Moje-Konto">Moje Konto</Link>
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
