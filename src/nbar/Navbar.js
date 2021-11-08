import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
const Navbar = ({ isUserLoggedIn, logout }) => {
    return (
        <div className="top-nav">
      <Link className="top-nav--link" to='/'>Home</Link>
      <Link className="top-nav--link" to='/posts'>Posts</Link>
      <Link className="top-nav--link" to='/profile'>Profile</Link>
      { !isUserLoggedIn && (
        <Link
          className="top-nav--link"
          to='/login'
        >
          Login
        </Link>
      ) }
      { isUserLoggedIn &&(
        <button
          className="top-nav--link"
          onClick={ () => {
            logout();
            axios.defaults.headers.common['Authorization'] = '';
          } }
        >
          Logout
        </button>
      ) }
      </div>
    );
};

export default Navbar;