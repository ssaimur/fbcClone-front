import { DIALOG_DELETE, DIALOG_LOGOUT, HIDE_DIALOG } from '../../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case DIALOG_LOGOUT:
      return { ...state, logoutDialog: true, showDialog: true };

    case DIALOG_DELETE:
      return { ...state, showDialog: true, deleteDialog: action.payload };

    case HIDE_DIALOG:
      return {
        ...state,
        logoutDialog: null,
        deleteDialog: null,
        showDialog: false,
      };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
