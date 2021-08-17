import React, { useState } from 'react';
import {
  HIDE_DIALOG,
  LOGOUT_ENDS,
  LOGOUT_STARTS,
  POST_DELETED,
} from '../../constants';
import { useGlobalContext } from '../../context/authContext/authContext';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import './dialogBox.css';

const DialogBox = ({
  deleteDialog,
  logoutDialog,
  showDialog,
  dialogDispatch,
}) => {
  const { dispatch } = useGlobalContext();
  const { dispatch: postDispatch } = useGlobalPostContext();

  console.count('dialog box rendered');

  const handleDelete = async () => {
    const { postId, userId, fileId } = deleteDialog;
    dialogDispatch({ type: HIDE_DIALOG });
    postDispatch({ type: POST_DELETED, payload: postId });

    await fetch(`posts/delete/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, fileId }),
    });
  };

  const handleLogOut = async () => {
    dialogDispatch({ type: HIDE_DIALOG });
    dispatch({ type: LOGOUT_STARTS });
    await fetch('/auth/logout', { method: 'POST' });
    dispatch({ type: LOGOUT_ENDS });
  };

  return (
    <div className='dialog'>
      <div
        className={`${showDialog && 'modalBackGround'}`}
        onClick={() => dialogDispatch({ type: HIDE_DIALOG })}
      ></div>
      <div className={`modal dialogFront ${showDialog && 'dialogFrontShow'}`}>
        {deleteDialog && <span className='deleteAlert'>Delete Post?</span>}
        <span>
          {logoutDialog
            ? 'Are you sure you want to log out?'
            : 'This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from the search results'}
        </span>
        <div className='dialogBtns'>
          <button
            className='dialogCancel'
            onClick={() => dialogDispatch({ type: HIDE_DIALOG })}
          >
            Cancel
          </button>
          <button
            className='dialogYes'
            onClick={logoutDialog ? handleLogOut : handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
export default DialogBox;
