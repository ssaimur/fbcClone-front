const {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} = require('./constants');

export const loginCall = async (data, dispatch) => {
  try {
    dispatch({ type: LOGIN_START });
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (resData.success === false) {
      return dispatch({ type: LOGIN_FAILURE, payload: resData });
    }

    dispatch({ type: LOGIN_SUCCESS, payload: resData });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err });
  }
};

export const registerCall = async (data, dispatch) => {
  dispatch({ type: REGISTRATION_START });
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resData = await response.json();

    console.log(resData);

    if (resData.success === false) {
      return dispatch({ type: REGISTRATION_FAILURE, payload: resData });
    }

    dispatch({ type: REGISTRATION_SUCCESS, payload: resData });
  } catch (err) {
    dispatch({ type: REGISTRATION_FAILURE, payload: err });
  }
};
