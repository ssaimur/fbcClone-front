import React, { useEffect, useState } from 'react';
import './feed.css';
import { useGlobalContext } from '../../context/authContext/authContext';
import Post from '../post/Post';
import Share from '../share/Share';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import { FETCH_POSTS, FETCH_STARTS } from '../../constants';
import { CircularProgress } from '@material-ui/core';
import Loader from '../../contentLoader';

function Feed({ username, explorePosts, firstName }) {
  const { user } = useGlobalContext();
  const { posts, dispatch, postFetching } = useGlobalPostContext();

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
      dispatch({ type: FETCH_STARTS });
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
        {(!username || username === user.username) && !explorePosts && (
          <Share />
        )}

        {firstName && (
          <div className='sticker'>
            <p className='profileIndicatorText'>
              {username === user.username ? 'Your' : `${firstName}'s`} timeline.
              ({posts.length} post{posts.length > 1 && 's'})
            </p>
          </div>
        )}

        {postFetching ? (
          // <div className='loadingSpinner'>
          //   <CircularProgress size={100} className='spinnerAbsolute' />
          // </div>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <Loader />
            <Loader />
          </div>
        ) : (
          posts.map((item) => {
            return (
              <Post key={item._id} post={item} explore={explorePosts && true} />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Feed;
