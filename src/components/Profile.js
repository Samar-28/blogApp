import React from 'react'
import blogContext from '../context/blogs/blogContext'
import { useEffect } from 'react';
import { useContext } from 'react';
import Navbar from './Navbar';
import UserBlogs from './UserBlogs';
import { useNavigate } from 'react-router-dom';
import NameModal from './NameModal';
import PassModal from './PassModal';
const Profile = () => {
    const context = useContext(blogContext);
    const {getUser,currUser}=context;
    const navigate=useNavigate();
    useEffect(() => {
      getUser();
    }, [])
    const avatar=()=>{
      navigate('/setavatar');
    }
    const pass=()=>{

    }
    const details=()=>{
      
    }
  return (
    <div className='main'>
        <Navbar/>
        <div className='profile-con'>
        {currUser && <div className="profile">
      <img src={`data:image/svg+xml;base64,${currUser.Avatar}`} alt="img" />
      <button className="p-btn" onClick={avatar}>Change Avater</button>
      <h2>Username: {currUser.name}</h2>
      <h2>Email: {currUser.email}</h2>
      <div className='p-btns'>
      <button className="p-btn"  data-bs-toggle="modal" data-bs-target="#exampleModal">Change UserName</button>
      <button className="p-btn" data-bs-toggle="modal" data-bs-target="#PassModal" onClick={pass}>Change Password</button>
      </div>
      </div>}
        </div>
        <UserBlogs/>
        <NameModal/>
        <PassModal/>
    </div>
  )
}

export default Profile
