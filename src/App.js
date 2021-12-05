import React, { useEffect, useState } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Explore from './pages/explore/Explore';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useGlobalContext } from './context/authContext/authContext';
import Navbar from './components/navbar/Navbar';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import PostWarningModal from './components/postWarningModal/PostWarningModal';
import DialogBox from './components/dialogBox/DialogBox';
import { useGlobalDialogContext } from './context/dialogContext/dialogContext';
import ScrollToTop from './ScrollToTop';
import People from './pages/people/People';
import Chat from './pages/chat/Chat';
import Rightbar from './components/rightbar/Rightbar';
import PrivateRoute from './components/private/PrivateRouter';

function App() {
  const { user } = useGlobalContext();
  const { deleteDialog, logoutDialog, showDialog, dispatch } =
    useGlobalDialogContext();

  const [width, setWidth] = useState(window.innerWidth);

  const callback = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        {user && width <= 767 && <Topbar />}
        <div className='appBody'>
          {user && width >= 768 && <Sidebar />}
          <Routes>
            <Route
              exact
              path='/'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path='/login'
              element={user ? <Navigate to='/' /> : <Login />}
            />

            <Route
              path='/register'
              element={user ? <Navigate to='/' /> : <Register />}
            />

            <Route
              path='/explore'
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />

            <Route
              path='/people'
              element={
                <PrivateRoute>
                  <People />
                </PrivateRoute>
              }
            />

            <Route
              path='/chat'
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />

            <Route
              path='/:username'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
          {user && width >= 900 && <Rightbar />}
        </div>
        {user && width <= 767 && <Navbar />}
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
