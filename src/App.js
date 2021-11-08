import React, { useState } from 'react';
import Home from './Home/Home';
import Navbar from './nbar/Navbar';
import Posts from './Posts/Posts';
import Post from './DetailsPosts/Post';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
const initialCurrentUser = {
  userId: null,
  token: null
}
function App() {
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const loginSuccess = ({ userId, token }) => setCurrentUser({userId, token});
  const isUserLoggedIn = Boolean(currentUser.userId);
  const logout = () => setCurrentUser(initialCurrentUser);
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar
          logout = { logout }
          isUserLoggedIn = { isUserLoggedIn } 
        />
        <Switch>
          <Route
            path="/"
            exact
          >
            <Home/>
          </Route>
          <Route
            path="/posts"
            exact
          >
            <Posts></Posts>
          </Route>
          <Route
            path="/posts/:id"
            exact
          >
            <Post/>
          </Route>
          <Route
            path="/profile"
            exact>    
            <Profile></Profile>
            </Route>
          <Route
            path="/login"
            exact
          >
            <Login
              loginSuccess = { loginSuccess }
            />
          </Route>  
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
