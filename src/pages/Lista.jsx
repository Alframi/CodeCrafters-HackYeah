// Lista.jsx
import React, { useState } from 'react';
import { StyledButton } from './Lista.styled';

const Lista = () => {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || []
  );

  return (
    <div>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lista;
