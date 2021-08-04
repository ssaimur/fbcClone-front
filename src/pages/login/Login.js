import React, { useRef } from 'react';
import './login.css';
import { useGlobalContext } from '../../context/authContext/authContext';
import { CircularProgress } from '@material-ui/core';
import { loginCall } from '../../apiCalls';
import { handleLoginSubmit } from '../../helper';

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const { user, isFetching, dispatch } = useGlobalContext();
  console.log(user, isFetching);
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
            <input
              type='password'
              placeholder='Password'
              className='loginInput'
              minLength='6'
              required
              ref={password}
            />
            <button className='loginButton' disabled={isFetching}>
              {isFetching ? <CircularProgress color='inherit' /> : 'Log in'}
            </button>
            <span className='loginForgot'>Forgot password?</span>
            <button className='loginRegisterButton'>Create new account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
