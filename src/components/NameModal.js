import React, { useContext, useEffect, useState } from 'react'
import blogContext from '../context/blogs/blogContext'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

export default function NameModal() {
    const toastoptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const navigate=useNavigate();
  const context = useContext(blogContext)
    const {username,setUsername,password,setPassword,changeUsername} = context;
    const change = async () => {
        const success = await changeUsername();
        if(success){
          toast.success('Username Successfully Changed',toastoptions)
          setTimeout(() => {
            window.location.reload(false)
          }, 2000);
        }
        else{
          toast.error('Cannot Verify User');
        }
    }
  return (
    <>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Change Username</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-container ic2">
                <input placeholder="New Usename" type="email" className="input" name='username' id="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <div className="cut"></div>
                <label className="iLabel" htmlFor="Username">Username</label>
              </div>
              <div className="input-container ic2">
                <input placeholder="Enter your password" type="password" className="input" name="password"  id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className="cut"></div>
                <label className="iLabel" htmlFor="password">Password</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  type="button" className="btn btn-danger m-btn" onClick={change}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}