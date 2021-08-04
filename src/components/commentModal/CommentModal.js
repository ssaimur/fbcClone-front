import React from 'react';
import { COMMENT_REMOVED } from '../../constants';
import './commentModal.css';

const CommentModal = ({ postId, commentId, toggle, dispatch }) => {
  const handleClick = async () => {
    dispatch({ type: COMMENT_REMOVED, payload: commentId });
    await fetch(`posts/comment/remove/${postId}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ commentId }),
    });
  };

  return (
    <div className='commentDelete'>
      <span className='sure'> Are you sure?</span>
      <button className='yes' onClick={handleClick}>
        Yes
      </button>
      <button className='cancel' onClick={() => toggle(false)}>
        Cancel
      </button>
    </div>
  );
};

export default CommentModal;
