import {
  INCREASE_DECREASE_LIKES,
  LOGIN_SUCCESS,
  POST_ADDED,
  POST_FAILED,
  POST_UPDATED,
} from './constants';
/**
 * cortrolls the post like behaviour
 */

export const likeCounter = async (likeCredentials) => {
  const { dispatch, _id, uid } = likeCredentials;

  dispatch({ type: INCREASE_DECREASE_LIKES, payload: uid });

  const likeReq = await fetch(`posts/like/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  });

  const likeRes = await likeReq.json();
};
/**
 * submits user to login
 */

export const handleLoginSubmit = (e, loginCredentials) => {
  const { email, password, loginCall, dispatch } = loginCredentials;
  e.preventDefault();
  // setErr(null);
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
  };
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
    user,
  } = creds;

  console.log({ helper: user });

  if (!file) {
    return alert('Photo is missing');
  }

  const formData = new FormData();

  formData.append('caption', desc);
  formData.append('file', file);
  formData.append('userId', userId);

  setPosting(true);

  const response = dp
    ? await fetch('/posts/dp/upload', {
        method: 'POST',
        body: formData,
      })
    : await fetch('/posts/upload', {
        method: 'POST',
        body: formData,
      });
  const resData = await response.json();
  console.log(resData);

  if (resData.success === false) {
    return dispatch({ type: POST_FAILED, payload: resData });
  }

  console.log(resData);

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
  const response = await fetch(`/posts/update/${postId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
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
  const date = new Date(new Date().getTime(createdAt));

  const [months, days, years] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  const [wDay, month, day, year] = new Date(`${months}/${days}/${years}`)
    .toString()
    .split(' ')
    .slice(0, 4);

  return `${wDay} ${day} ${month} ${year}`;
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
