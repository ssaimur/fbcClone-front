import React, { useEffect, useState } from 'react';
import Person from '../../components/person/Person';
import url, { AUTH_REQUIRED } from '../../constants';
import { LoaderAllUsers, LoaderAllUsersSmall } from '../../contentLoader';
import { useGlobalContext } from '../../context/authContext/authContext';
import './people.css';

const People = ({ sidebar }) => {
  const { dispatch, user } = useGlobalContext();
  const [people, setPeople] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setFetching(true);
      const response = await fetch(`${url}/users/people`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const resData = await response.json();

      if (resData.statusCode === 401) {
        return dispatch({ type: AUTH_REQUIRED });
      }
      setPeople(resData.data);
      setFetching(false);
    };

    fetchPeople();
  }, [dispatch]);

  return (
    <div className='container people'>
      <div className='wrapper'>
        {!sidebar && (
          <div className='sticker'>
            <p>Find people in Firegram</p>
          </div>
        )}
        {fetching ? (
          !sidebar ? (
            <LoaderAllUsers />
          ) : (
            <LoaderAllUsersSmall />
          )
        ) : !sidebar ? (
          people.map((item) => (
            <Person person={item} key={item._id} sidebar={sidebar} />
          ))
        ) : (
          people
            .filter(
              (item) =>
                !item.followers.includes(user._id) && item._id !== user._id
            )
            .slice(0, 3)
            .map((item) => (
              <Person person={item} key={item._id} sidebar={sidebar} />
            ))
        )}
      </div>
      {!sidebar && <div className='invisibleDiv'></div>}
    </div>
  );
};

export default People;
