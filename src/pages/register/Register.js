import React, { useRef, useState } from 'react';
import './register.css';
import { useGlobalContext } from '../../context/authContext/authContext';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ImFire } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { registerCall } from '../../apiCalls';
import { handleRegisterSubmit } from '../../helper';

const Register = () => {
  const { dispatch, isFetching, regiError } = useGlobalContext();
  const { type, msg } = regiError || {};
  const [showPassword, setShowPassword] = useState(false);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const desc = useRef(null);
  const city = useRef(null);
  const password = useRef(null);
  const [gender, setGender] = useState('');

  const registerCredentials = {
    firstName,
    lastName,
    username,
    email,
    password,
    city,
    desc,
    gender,
    registerCall,
    dispatch,
  };

  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerTop'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            {/* <img src='/assets/logo.png' className='registerLogo' /> */}
            <ImFire className='logoIcon' />
          </Link>
          <h1>Welcome to Firegram</h1>
        </div>
        {type && (
          <div className='showWarning'>
            <p>
              {/* {(err === 'email' || 'password') && 'Invalid email or password!'} */}
              {msg}
            </p>
          </div>
        )}
        <div className='registerCenter'>
          <form
            onSubmit={(e) => handleRegisterSubmit(e, registerCredentials)}
            className='registerBox'
          >
            <div className='registerName'>
              <input
                type='text'
                placeholder='*First name'
                className='registerInput regiHalf'
                ref={firstName}
                id='firstName'
              />

              <input
                type='text'
                placeholder='Last name'
                className='registerInput regiHalf'
                ref={lastName}
                id='lastName'
              />
            </div>

            <input
              type='text'
              placeholder='*Username'
              className='registerInput'
              ref={username}
              autoComplete='off'
            />

            <input
              type='email'
              placeholder='*Email'
              className='registerInput'
              ref={email}
              id='email'
            />

            <div className='passWrap'>
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                placeholder='*Password'
                className='registerInput'
                minLength='6'
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

            <div className='registerName'>
              <select
                id='gender'
                className='registerInput regiSelect'
                onChange={(e) => setGender(e.target.value)}
                defaultValue=''
              >
                <option disabled value=''>
                  Gender
                </option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>

              <input
                type='text'
                placeholder='Address'
                className='registerInput regiAdd'
                ref={city}
                id='address'
              />
            </div>

            <textarea
              type='text'
              cols='10'
              placeholder='Your bio goes here'
              className='registerInput regiBio'
              ref={desc}
              id='bio'
            />

            <button
              className={`registerButton ${isFetching && 'logging'}`}
              disabled={isFetching}
            >
              {isFetching ? 'Signing up...' : 'Sign up'}
            </button>
          </form>
        </div>
        <div className='registerBottom'>
          <p>
            Already have an account? <Link to='/login'>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
