import React, { useState } from 'react';
import './dropdowns.css'
import down from '../../assets/chevron-down.png'

const Lang = () => {
  const [open, setOpen] = useState(false);

  const handleState = () => {
    setOpen(!open);
  };

  return (
    <div className='dropdown'>
      <button onClick={ handleState }>English</button>
      {open ? (
        <ul className='menu'>
            <li>English</li>
            <li>Spanish</li>
            <li>Latin</li>
            <li>French</li>
        </ul>
      ) : null}
    </div>
  );
};


export const Type = () => {
  const [open, setOpen] = useState(false);

  const handleState = () => {
    setOpen(!open);
  };

  return (
    <div className='dropdown'>
      <button onClick={ handleState }>Movies<img src={ down } alt="" /></button>
      {open ? (
        <ul className='menu'>
            <li>Series</li>
            <li>Documentary</li>
            <li>Anime</li>
        </ul>
      ) : null}
    </div>
  );
};

export default Lang;