// login constants
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// logout user
export const LOGOUT_STARTS = 'LOGOUT_STARTS';
export const LOGOUT_ENDS = 'LOGOUT_ENDS';

// registration constants
export const REGISTRATION_START = 'REGISTRATION_START';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

// post cosntants

export const MAIN_USER_LIKES = 'MAIN_USER_LIKES';
export const USER_FETCHED = 'USER_FETCHED';
export const INCREASE_DECREASE_LIKES = 'INCREASE_DECREASE_LIKES';

// feed post constants

export const FETCH_STARTS = 'FETCH_STARTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const POST_DELETED = 'POST_DELETED';
export const POST_ADDED = 'POST_ADDED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_FAILED = 'POST_FAILED';
export const CLEAR_POST_ERROR = 'CLEAR_POST_ERROR';

// comment constants
export const COMMENT_ADDED = 'COMMENT_ADDED';
export const COMMENT_REMOVED = 'COMMENT_REMOVED';
export const COMMENT_TOGGLE = 'COMMENT_TOGGLE';

// dialog constants

export const DIALOG_LOGOUT = 'DIALOG_LOGOUT';
export const DIALOG_DELETE = 'DIALOG_DELETE';
export const HIDE_DIALOG = 'HIDE_DIALOG';

// auth required

export const AUTH_REQUIRED = 'AUTH_REQUIRED';

// the url

const url = 'https://social-firegram.herokuapp.com/api';
// const url = 'http://localhost:4000/api';

export default url;
