import React from 'react';
import './profileOptions.css';
import { Person } from '@material-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/authContext/authContext';
import { DIALOG_LOGOUT, LOGOUT_ENDS, LOGOUT_STARTS } from '../../constants';
import { useGlobalDialogContext } from '../../context/dialogContext/dialogContext';

const ProfileOptions = () => {
  const { dispatch } = useGlobalDialogContext();
  const { user } = useGlobalContext();

  return (
    <div className='profileOptions'>
      <Link to={`/${user.username}`} style={{ textDecoration: 'none' }}>
        <span className='profileOptionsItems'>
          Profile <Person />
        </span>
      </Link>
      <span
        className='profileOptionsItems'
        onClick={() => dispatch({ type: DIALOG_LOGOUT })}
      >
        Log out
        <FiLogOut />
      </span>
    </div>
  );
};

export default ProfileOptions;
