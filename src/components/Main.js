import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import blogContext from '../context/blogs/blogContext'
import { useNavigate } from 'react-router-dom'
import Post from './Post'

const Main = () => {
  const context = useContext(blogContext);
  const {getBlogs,blogs}=context;
    
    const navigate=useNavigate();

    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate('/login');
      }
    }, [])
    useEffect(() => {
      getBlogs()
    }, [])
    


  return (
    <div className='main'>
          <Navbar/>
        <div className='post-con'>
        {
          blogs.map((obj,i)=>{
            return <div key={i}><Post {...obj} /></div>
          })
        }
        </div>
    </div>
  )
}

export default Main
