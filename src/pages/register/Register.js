import React, { useRef, useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { registerCall } from '../../apiCalls';
import { useGlobalContext } from '../../context/authContext/authContext';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { handleRegisterSubmit } from '../../helper';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Register = () => {
  const classes = useStyles();

  const { dispatch, isFetching, regiError } = useGlobalContext();
  const { type, msg } = regiError || {};
  const [showPassword, setShowPassword] = useState(false);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const registerCredentials = {
    firstName,
    lastName,
    username,
    email,
    password,
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
                ref={firstName}
                required
              />
              <span>{type === 'firstName' && msg}</span>
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
              ref={username}
              required
            />
            <span>{type === 'username' && msg}</span>
            <input
              type='email'
              placeholder='Email'
              className='registerInput'
              ref={email}
              required
            />
            <span>{type === 'email' && msg}</span>
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              placeholder='Password'
              className='registerInput'
              required
              minLength='6'
              ref={password}
              autoComplete='off'
            />
            <VisibilityIcon onClick={() => setShowPassword(!showPassword)}>
              showPassword
            </VisibilityIcon>
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
