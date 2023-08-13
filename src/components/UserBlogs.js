import React from 'react'
import blogContext from '../context/blogs/blogContext'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';

const UserBlogs = () => {
  const navigate=useNavigate();
  const context = useContext(blogContext);
  const {getUserBlogs,userblogs}=context;
  useEffect(() => {
    getUserBlogs();
  }, [])
  
  return (
      <div className='post-con'>
        <h2 className='up-head'>User Posts</h2>
      {
      userblogs && 
      Array.from(userblogs).map((obj,i)=>{
        return <div key={i} onClick={()=>{
          navigate(`/post/${obj._id}`)
        }}><Post {...obj} /></div>
      })
      }
    </div>
  )
}

export default UserBlogs
