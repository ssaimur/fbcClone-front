import { INCREASE_DECREASE_LIKES } from './constants';

// cortrolls the post like behaviour
export const likeCounter = async (likeCredentials) => {
  const { dispatch, _id, uid } = likeCredentials;

  dispatch({ type: INCREASE_DECREASE_LIKES });

  const likeReq = await fetch(`posts/like/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  });

  const likeRes = await likeReq.json();
  console.log(likeRes);
};

// submits user to login
export const handleLoginSubmit = (e, loginCredentials) => {
  const { email, password, loginCall, dispatch } = loginCredentials;
  e.preventDefault();
  const jsonData = {
    email: email.current.value,
    password: password.current.value,
  };
  console.log(JSON.stringify(jsonData));
  loginCall(jsonData, dispatch);
};

// submits user to register
export const handleRegisterSubmit = (e, registerCredentials) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    passwordAgain,
    registerCall,
    dispatch,
  } = registerCredentials;

  e.preventDefault();
  if (password.current.value !== passwordAgain.current.value) {
    passwordAgain.current.setCustomValidity("Passwords didn't match");
  } else {
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    registerCall(user, dispatch);
  }
};
