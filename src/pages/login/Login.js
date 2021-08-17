import React, { useRef } from 'react';
import './login.css';
import { useGlobalContext } from '../../context/authContext/authContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { handleLoginSubmit } from '../../helper';

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const { loginError, isFetching, dispatch } = useGlobalContext();
  const { type, msg } = loginError || {};
  const loginCredentials = { email, password, loginCall, dispatch };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>fbClone</h3>
          <span className='loginDesc'>
            fbClone helps you connect and share with the people in your life.
          </span>
        </div>
        <div className='loginRight'>
          <form
            onSubmit={(e) => handleLoginSubmit(e, loginCredentials)}
            className='loginBox'
          >
            <input
              type='email'
              placeholder='Email'
              required
              className='loginInput'
              ref={email}
            />
            <span>{type === 'email' && msg}</span>
            <input
              type='password'
              placeholder='Password'
              className='loginInput'
              minLength='6'
              required
              autoComplete='off'
              ref={password}
            />
            <span>{type === 'password' && msg}</span>
            <button className='loginButton' disabled={isFetching}>
              {isFetching ? <CircularProgress color='inherit' /> : 'Log in'}
            </button>
            <span className='loginForgot'>Forgot password?</span>
          </form>
          <Link to='/register'>
            <button className='loginRegisterButton'>Create new account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
