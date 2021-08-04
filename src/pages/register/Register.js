import React, { useRef } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { registerCall } from '../../apiCalls';
import { useGlobalContext } from '../../context/authContext/authContext';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleRegisterSubmit } from '../../helper';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Register = () => {
  const classes = useStyles();

  const { dispatch, isFetching } = useGlobalContext();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const passwordAgain = useRef(null);

  const registerCredentials = {
    firstName,
    lastName,
    username,
    email,
    password,
    passwordAgain,
    registerCall,
    dispatch,
  };

  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerLeft'>
          <h3 className='registerLogo'>fbClone</h3>
          <span className='registerDesc'>
            fbClone helps you connect and share with the people in your life.
          </span>
        </div>
        <div className='registerRight'>
          <form
            className='registerBox'
            onSubmit={(e) => handleRegisterSubmit(e, registerCredentials)}
          >
            <div className='registerName'>
              <input
                type='text'
                placeholder='First name'
                className='registerInput nameInput'
                required
                ref={firstName}
              />
              <input
                type='text'
                placeholder='Last name'
                className='registerInput nameInput'
                ref={lastName}
              />
            </div>

            <input
              type='text'
              placeholder='Username'
              className='registerInput'
              required
              ref={username}
            />
            <input
              type='email'
              placeholder='Email'
              className='registerInput'
              required
              ref={email}
            />
            <input
              type='password'
              placeholder='Password'
              className='registerInput'
              required
              minLength='6'
              ref={password}
            />
            <input
              type='password'
              placeholder='Confirm password'
              className='registerInput'
              ref={passwordAgain}
            />
            <button className='registerButton' disabled={isFetching}>
              {isFetching ? (
                <Backdrop className={classes.backdrop} open={isFetching}>
                  <CircularProgress color='inherit' />
                </Backdrop>
              ) : (
                'Sign Up'
              )}
            </button>
            <p className='already'>
              Already have an account?
              <Link to='/login' className='alreadyText'>
                Log into an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
