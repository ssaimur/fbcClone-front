import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
} from '../../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, isFetching: true };

    case LOGIN_SUCCESS:
      return { ...state, isFetching: false, user: action.payload };

    case LOGIN_FAILURE:
      return { ...state, isFetching: false, error: action.payload };

    case REGISTRATION_START:
      return { ...state, isFetching: true };

    case REGISTRATION_SUCCESS:
      return { ...state, isFetching: false, user: action.payload };

    case REGISTRATION_FAILURE:
      return { ...state, isFetching: false, error: action.payload };

    default:
      throw new Error(`No matching error type - ${action.type}`);
  }
};

export default reducer;
