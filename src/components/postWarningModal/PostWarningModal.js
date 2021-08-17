import React, { useState } from 'react';
import { CLEAR_POST_ERROR } from '../../constants';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import './postWarningModal.css';

const PostWarningModal = () => {
  const { dispatch, postError } = useGlobalPostContext();

  console.count('post warning modal rendered');

  return (
    <div className='modal'>
      <div
        className={` ${postError && 'modalBackGround'}`}
        onClick={() => dispatch({ type: CLEAR_POST_ERROR })}
      ></div>
      <div className={`modal modalFront ${postError && 'modalFrontShow'}`}>
        <span>{postError?.msg}</span>
        <button onClick={() => dispatch({ type: CLEAR_POST_ERROR })}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PostWarningModal;
