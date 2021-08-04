import React, { useReducer, useState } from 'react';
import reducer from './postReducer';

const PostContext = React.createContext();

const initialState = {
  posts: [],
  postFetching: false,
};

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.posts, state.postFetching);
  // const [posts, setPosts] = useState([]);
  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export const useGlobalPostContext = () => {
  return React.useContext(PostContext);
};

export default PostContextProvider;
