import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_STARTS,
  LOGOUT_ENDS,
  REGISTRATION_FAILURE,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  AUTH_REQUIRED,
} from '../../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, isFetching: true };

    case LOGIN_FAILURE:
      return { ...state, isFetching: false, loginError: action.payload };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload.user,
        loginError: null,
      };

    case LOGOUT_STARTS:
      return { ...state, isFetching: true };

    case LOGOUT_ENDS:
      return { ...state, isFetching: false, user: null };

    case REGISTRATION_START:
      return { ...state, isFetching: true };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload.newUser,
        regiError: null,
      };

    case REGISTRATION_FAILURE:
      return { ...state, isFetching: false, regiError: action.payload };

    case AUTH_REQUIRED:
      return { ...state, user: null };

    default:
      throw new Error(`No matching error type - ${action.type}`);
  }
};

export default reducer;
