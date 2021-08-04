import {
  FETCH_POSTS,
  FETCH_STARTS,
  POST_ADDED,
  POST_DELETED,
} from '../../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_STARTS:
      return { ...state, postFetching: true };

    case FETCH_POSTS:
      const sortedPost = action.payload.sort(
        (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
      );
      return { ...state, postFetching: false, posts: sortedPost };

    case POST_DELETED:
      const deletedPosts = state.posts.filter(
        (post) => post._id !== action.payload
      );
      return { ...state, posts: deletedPosts };

    case POST_ADDED:
      state.posts.unshift(action.payload);
      return { ...state, posts: state.posts };

    default:
      break;
  }
  // if (action.type === FETCH_STARTS) {
  //   return { ...state, postFetching: true };
  // }
  // if (action.type === FETCH_POSTS) {
  //   return { ...state, posts: action.payload };
  // }

  throw new Error(`No matching action type - ${action.type}`);
};

export default reducer;
