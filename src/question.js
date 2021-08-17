import React from 'react';
import { Link } from 'react-router-dom';

const Question = () => {
  let active;

  const handleClick = (iconName) => {
    active = {};
    active[iconName] = true;
  };
  console.log(active.isHome);

  return (
    <Link to='/'>
      <div
        className={`center ${active.isHome === true && 'active'}`}
        onClick={() => handleClick('isHome')}
      >
        <Home className='navItem' />
      </div>
    </Link>
  );
};

export default Question;
