import React, { useEffect, useState } from 'react';
import Person from '../../components/person/Person';
import './people.css';

const People = () => {
  const [people, setPeople] = useState([]);
  const [fetching, setFetching] = useState(false);
  console.log(people);

  useEffect(() => {
    const fetchPeople = async () => {
      setFetching(true);
      const response = await fetch('users/people');
      const resData = await response.json();
      console.log(resData);
      setPeople(resData.data);
      setFetching(false);
    };

    fetchPeople();
  }, []);

  return (
    <>
      {!fetching && (
        <div className='people'>
          <div className='peopleWrapper'>
            <div className='sticker'>
              <p>Find people in Firegram</p>
            </div>
            {people.map((item) => (
              <Person person={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default People;
