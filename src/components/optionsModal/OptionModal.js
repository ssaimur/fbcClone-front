import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { POST_DELETED } from '../../constants';
import { useGlobalPostContext } from '../../context/postContext/postContext';
import './optionModal.css';

const OptionModal = ({ postId, userId, fileId }) => {
  const { dispatch } = useGlobalPostContext();

  const handleDelete = async () => {
    dispatch({ type: POST_DELETED, payload: postId });

    await fetch(`posts/delete/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, fileId }),
    });
  };

  return (
    <div className='optionModal'>
      <div className='optionModalItems' onClick={handleDelete}>
        Delete <Delete />
      </div>
      <hr />
      <div className='optionModalItems'>
        Edit <Edit />
      </div>
    </div>
  );
};

export default OptionModal;
