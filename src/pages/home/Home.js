import React from 'react';
import './home.css';
import Feed from '../../components/feed/Feed';

const Home = () => {
  return (
    <>
      <div className='container'>
        <Feed />
      </div>
    </>
  );
};

export default Home;
