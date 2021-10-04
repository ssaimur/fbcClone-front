import {
  INCREASE_DECREASE_LIKES,
  LOGIN_SUCCESS,
  POST_ADDED,
  POST_FAILED,
  POST_UPDATED,
} from './constants';
import url from './constants';

/**
 * cortrolls the post like behaviour
 */

export const likeCounter = (likeCredentials) => {
  const { dispatch, uid, _id } = likeCredentials;
  console.log({ uid });

  dispatch({ type: INCREASE_DECREASE_LIKES, payload: uid });

  fetch(`${url}/posts/like/${_id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ uid }),
  });
};

/**
 * submits user to login
 */

export const handleLoginSubmit = (e, loginCredentials) => {
  const { email, password, loginCall, dispatch } = loginCredentials;
  e.preventDefault();

  const jsonData = {
    email: email.current.value,
    password: password.current.value,
  };

  loginCall(jsonData, dispatch);
};

/**
 * submits user to register
 */

export const handleRegisterSubmit = (e, registerCredentials) => {
  const {
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
  } = registerCredentials;

  e.preventDefault();

  const user = {
    firstName: firstName.current.value,
    lastName: lastName.current.value,
    username: username.current.value,
    email: email.current.value,
    password: password.current.value,
    city: city.current.value,
    desc: desc.current.value,
  };

  if (gender) {
    user.gender = gender;
  }

  registerCall(user, dispatch);
};

/**
 *  handles profile picture upload
 */

export const handlePostUpload = async (creds) => {
  const {
    file,
    dispatch,
    authDispatch,
    desc,
    userId,
    setPosting,
    setFile,
    setDesc,
    setImg,
    dp,
  } = creds;

  // if (!file) {
  //   return alert('Photo is missing');
  // }

  const formData = new FormData();

  formData.append('caption', desc);
  formData.append('file', file);
  formData.append('userId', userId);

  setPosting(true);

  const response = dp
    ? await fetch(`${url}/posts/dp/upload`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData,
      })
    : await fetch(`${url}/posts/upload`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData,
      });
  const resData = await response.json();

  if (resData.success === false) {
    return dispatch({ type: POST_FAILED, payload: resData });
  }

  dispatch({ type: POST_ADDED, payload: resData.data });
  dp && authDispatch({ type: LOGIN_SUCCESS, payload: resData });

  dp && setImg(resData.user.dpImage);
  setFile(null);
  setDesc('');
  setPosting(false);
};

/**
 *  handling post update
 */

export const handlePostUpdate = async (updateCreds) => {
  const { setPosting, setShow, postId, desc, dispatch } = updateCreds;

  setPosting(true);
  const response = await fetch(`${url}/posts/update/${postId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ caption: desc }),
  });
  const resData = await response.json();

  if (resData.success === false) {
    return dispatch({ type: POST_FAILED, payload: resData });
  }

  dispatch({ type: POST_UPDATED, payload: resData.data });
  setShow(false);
  setPosting(false);
};

/**
 *  extracting the join date from mongodb
 */

export const getDate = (createdAt) => {
  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const date = createdAt;

  const day = date.split('-')[2].split('').slice(0, 2).join('');

  const month = date.split('-').slice(0, 2)[1];
  const year = date.split('-').slice(0, 2)[0];

  return `${day} ${months[month]} ${year}`;
};

/**
 *  format date
 */

export const formatDate = (format, createdAt) => {
  const splitDate = format(createdAt).split(' ');
  const splitFormat = splitDate[1].split('');
  let createDate = splitDate[0] + splitFormat[0];

  if (format(createdAt) === 'just now') {
    createDate = 'just now';
  }

  return createDate;
};
