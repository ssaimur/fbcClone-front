import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { DIALOG_DELETE } from '../../constants';
import { useGlobalDialogContext } from '../../context/dialogContext/dialogContext';
import './optionModal.css';

const OptionModal = ({ deleteCreds, updateCreds }) => {
  const { dispatch } = useGlobalDialogContext();
  const { setShow } = updateCreds;

  // const deleteCreds = { postId, userId, fileId };

  return (
    <div className='optionModal'>
      <span
        className='optionModalItems'
        onClick={() => dispatch({ type: DIALOG_DELETE, payload: deleteCreds })}
      >
        Delete <Delete />
      </span>

      <span className='optionModalItems' onClick={() => setShow(true)}>
        Edit <Edit />
      </span>
    </div>
  );
};

export default OptionModal;
