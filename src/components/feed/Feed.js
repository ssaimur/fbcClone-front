import React, { useEffect, useState } from 'react';
import './feed.css';
import { useGlobalContext } from '../../context/authContext/authContext';
import Post from '../post/Post';
import Share from '../share/Share';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import { FETCH_POSTS, FETCH_STARTS } from '../../constants';

function Feed({ username, explorePosts }) {
  const { user } = useGlobalContext();
  const { posts, dispatch } = useGlobalPostContext();

  console.log(posts);

  // useEffect(() => {
  //   const fetchData = () => {
  //     username
  //       ? dispatch({ type: FETCH_TIMELINE_POSTS, payload: username })
  //       : explorePosts
  //       ? dispatch({ type: FETCH_EXPLORE_POSTS })
  //       : dispatch({ type: FETCH_NEWSFEED_POSTS, payload: user._id });
  //   };

  //   fetchData();
  // }, [username, user._id]);

  // const [posts, setPosts] = useState([]);

  // first checks where it is going to be rendered (news feed or profile)
  // then fetches all posts according to that
  useEffect(() => {
    const fetchData = async () => {
      // dispatch({ type: FETCH_STARTS });
      const response = username
        ? await fetch(`/posts/profile/${username}`)
        : explorePosts
        ? await fetch('/posts/explore')
        : await fetch(`/posts/newsfeed/${user._id}`);
      const resData = await response.json();
      dispatch({ type: FETCH_POSTS, payload: resData });
    };

    fetchData();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share />}
        {posts.map((item) => {
          return <Post key={item._id} post={item} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
