import React, { useRef, useState } from 'react';
import './login.css';
import { useGlobalContext } from '../../context/authContext/authContext';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ImFire } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { handleLoginSubmit } from '../../helper';

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const { loginError, isFetching, dispatch } = useGlobalContext();
  const { type } = loginError || {};
  const loginCredentials = { email, password, loginCall, dispatch };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginTop'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            {/* <img src='/assets/logo.png' className='loginLogo' /> */}
            <ImFire className='logoIcon' />
          </Link>
          <h1>Sign in to Firegram</h1>
        </div>
        {type && (
          <div className='showWarning'>
            <p>
              {/* {(err === 'email' || 'password') && 'Invalid email or password!'} */}
              Invalid email or password!
            </p>
          </div>
        )}
        <div className='loginCenter'>
          <form
            onSubmit={(e) => handleLoginSubmit(e, loginCredentials)}
            className='loginBox'
          >
            <label htmlFor='email'>
              Email
              <input
                type='email'
                // placeholder='Email'
                required
                className='loginInput'
                ref={email}
                id='email'
              />
            </label>

            <label htmlFor='password'>
              Password
              <div className='passWrap'>
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  // placeholder='Password'
                  className='loginInput'
                  minLength='6'
                  required
                  autoComplete='off'
                  ref={password}
                  id='password'
                />
                {showPassword ? (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </label>

            <button
              className={`loginButton ${isFetching && 'logging'}`}
              disabled={isFetching}
            >
              {isFetching ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        <div className='loginBottom'>
          <p>
            New to Firegram? <Link to='/register'>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
