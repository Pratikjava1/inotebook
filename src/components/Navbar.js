import React from 'react'
import {Link} from "react-router-dom"
import { authcontext } from '../context/AuthState';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

function Navbar() {

  const {isLoggedIn}=useContext(authcontext);
  let navigate =useNavigate();

  const handleLogout=()=>{
    navigate("/login");
    localStorage.removeItem("token");
    
    
  }

  return (
    < >
      
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">Inotebook</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
       
     
      
  </ul>
  <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
       {!isLoggedIn&&<Link className="nav-link" to="/login">Login</Link>}
      </li>
      <li className="nav-item">
        {!isLoggedIn&&<Link className="nav-link" to="/signup">Sign Up</Link>}
      </li>
      <li className="nav-item">
        {isLoggedIn&&<button className="nav-link" onClick={handleLogout}>Logout</button>}
      </li>
       
     
      
  </ul>
  
  </div>
 
</nav>

    </>
  )
}

export default Navbar
