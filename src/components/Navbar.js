import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import blogContext from '../context/blogs/blogContext'
import { useEffect } from "react";
const Navbar = () => {
  const context=useContext(blogContext);
  const {currUser,getUser} = context;
  useEffect(() => {
    getUser();
  }, [])
  
  const navigate=useNavigate()
  return (
    <nav>
      <div className="logo">
        <div style={{fontWeight:"bold", fontSize:"30px"}}> <Link style={{textDecoration:"none",color:"#212529"}} to="/">.Blog</Link></div>
      </div>
        <div className="dropdown">
          <button className="dropdown-btn">
          <img src={currUser && `data:image/svg+xml;base64,${currUser.Avatar}`} alt="" />
            {currUser && <span className="name">{window.screen.width>450?currUser.name:currUser.name.substring(0,5)}</span>}
            <span className="arrow"></span>
          </button>
          <ul className="dropdown-content">
            <li style={{"--delay":"1"}}><Link to="/profile">Profile</Link></li>
            <li style={{"--delay":"2"}}><Link to="/create">Create Post</Link></li>
            <li style={{"--delay":"3"}}><Link to="/">Home</Link></li>
          </ul>
        </div>
      <div className="right">
        <button className="Btn" onClick={()=>{
          localStorage.removeItem('token');
          navigate('/login');
        }}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
