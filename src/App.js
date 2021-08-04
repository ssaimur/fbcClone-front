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
} from 'react-router-dom';
import { useGlobalContext } from './context/authContext/authContext';

function App() {
  const { user } = useGlobalContext();
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {user ? <Home /> : <Login />}
        </Route>
        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
        <Route path='/explore'>
          <Explore />
        </Route>
        <Route path='/:username'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
