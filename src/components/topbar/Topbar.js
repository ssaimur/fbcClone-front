import React from 'react';
import './topbar.css';
import {
  Search,
  Person,
  Chat,
  Notifications,
  Fireplace,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import { LinearProgress } from '@material-ui/core';
import { useGlobalContext } from '../../context/authContext/authContext';
// import { useGlobalPostContext } from '../../context/postContext/postContext';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//     position: 'sticky',
//     top: '50px',
//   },
// }));

const Topbar = () => {
  const { user } = useGlobalContext();
  // const { postFetching } = useGlobalPostContext();

  // const classes = useStyles();

  return (
    <>
      <div className='topbarContainer'>
        <div className='topbarWrapper'>
          <div className='topbarLeft'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              {/* <img src='/assets/logo.png' className='logo' /> */}
              <Fireplace className='logoIcon' fontSize='large' />
            </Link>
          </div>
          <div className='topbarCenter'>
            <div className='searchbar'>
              <input
                placeholder='Type here to search...'
                className='searchInput'
                onClick={() =>
                  alert(
                    "Currently working on 'Search' and 'Chat' functionality. Sorry for the inconvenience :("
                  )
                }
              />
              <Search className='searchIcon' />
            </div>
          </div>
        </div>
      </div>
      {/* {postFetching && (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )} */}
    </>
  );
};

export default Topbar;

{
  /* <Link to={`/${user.username}`}>
  <img
    src={
      user.dpImage
        ? `/posts/file/${user.dpImage}`
        : `/assets/persons/${
            user.gender === 'Male' ? 'noAvatar.jpg' : 'noAvatarFemale.png'
          }`
    }
    alt='dp'
    className='topbarImg'
  />
</Link>; */
}
