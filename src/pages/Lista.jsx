// Lista.jsx
import React, { useState } from 'react';
import { StyledButton } from './Lista.styled';

const Lista = () => {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || []
  );

  // const addEvent = event => {
  //   const newEvents = [...events, event];
  //   localStorage.setItem('events', JSON.stringify(newEvents));
  //   setEvents(newEvents);
  // };

  return (
    <div>
      {/* <StyledButton
        onClick={() => addEvent({ name: 'Nowe Zdarzenie', date: new Date() })}
      >
        Wybierz
      </StyledButton> */}
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
