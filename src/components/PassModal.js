import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import blogContext from '../context/blogs/blogContext';
import { useNavigate } from 'react-router-dom';
export default function UsernameModal() {
  const toastoptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}
const navigate =useNavigate();
  const context = useContext(blogContext)
    const {npassword,setNpassword,password,setPassword,changePassword} = context;
    const change = async () => {
      const success = await changePassword();
      if(success){
        toast.success('Password Successfully Changed',toastoptions)
        setTimeout(() => {
          localStorage.clear();
          navigate('/login')
          window.location.reload(false);
        }, 2000);
      }
      else{
        toast.error('Cannot Verify Password');
      }
    }
    const onchangeU = (e) => {
      setNpassword(e.target.value)
    }
    const onchangeP = (e) => {
      setPassword(e.target.value);
    }
  return (
    <>
      <div className="modal fade" id="PassModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-container ic2">
                <input placeholder="New Password" type="password" value={npassword}  onChange={onchangeU} className="input" name='npassword' id="npassword" />
                <div className="cut"></div>
                <label className="iLabel" htmlFor="Username">New Password</label>
              </div>
              <div className="input-container ic2">
                <input placeholder="Old password" type="password" value={password} onChange={onchangeP} className="input" name="password"  id="password" />
                <div className="cut"></div>
                <label className="iLabel" htmlFor="password">Old Password</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger m-btn" onClick={()=>change()}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}