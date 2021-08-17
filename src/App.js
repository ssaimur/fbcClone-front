import React from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Explore from './pages/explore/Explore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useGlobalContext } from './context/authContext/authContext';
import Navbar from './components/navbar/Navbar';
import Topbar from './components/topbar/Topbar';
import PostWarningModal from './components/postWarningModal/PostWarningModal';
import DialogBox from './components/dialogBox/DialogBox';
import { useGlobalDialogContext } from './context/dialogContext/dialogContext';
import WhoLikedModal from './components/whoLikedModal/WhoLikedModal';
import ScrollToTop from './ScrollToTop';
import People from './pages/people/People';

function App() {
  const { user } = useGlobalContext();
  const { deleteDialog, logoutDialog, showDialog, dispatch } =
    useGlobalDialogContext();

  return (
    <>
      <Router>
        <ScrollToTop />
        {user && <Topbar />}
        <Switch>
          <Route exact path='/'>
            {user ? <Home /> : <Redirect to='/login' />}
          </Route>
          <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
          <Route path='/register'>
            {user ? <Redirect to='/' /> : <Register />}
          </Route>
          <Route path='/explore'>
            {user ? <Explore /> : <Redirect to='/login' />}
          </Route>
          <Route path='/people'>
            {user ? <People /> : <Redirect to='/login' />}
          </Route>
          <Route path='/:username'>
            {user ? <Profile /> : <Redirect to='/login' />}
          </Route>
        </Switch>
        {user && <Navbar />}
      </Router>
      <PostWarningModal />
      <DialogBox
        deleteDialog={deleteDialog}
        logoutDialog={logoutDialog}
        showDialog={showDialog}
        dialogDispatch={dispatch}
      />
    </>
  );
}

export default App;
