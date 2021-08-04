import {
  COMMENT_ADDED,
  COMMENT_REMOVED,
  COMMENT_TOGGLE,
  INCREASE_DECREASE_LIKES,
  MAIN_USER_LIKES,
  USER_FETCHED,
} from '../../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case MAIN_USER_LIKES:
      return { ...state, isLiked: true };

    case USER_FETCHED:
      return { ...state, user: action.payload };

    case INCREASE_DECREASE_LIKES:
      const likes = state.isLiked ? state.like - 1 : state.like + 1;
      return { ...state, like: likes, isLiked: !state.isLiked };

    case COMMENT_TOGGLE:
      return { ...state, isComment: !state.isComment };

    case COMMENT_ADDED:
      state.postComments.unshift(action.payload);
      return { ...state, isComment: true };

    case COMMENT_REMOVED:
      const filteredComments = state.postComments.filter(
        (item) => item.commentId !== action.payload
      );
      return { ...state, postComments: filteredComments };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
