import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { PostBlog } from "../utils/ApiRoutes";

const CreatePost = () => {
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState("");
  const navigate = useNavigate(); 
  const toastoptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!files){
      toast.error("Please Choose an image", toastoptions)
      return;
    }
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
    data.append('token',localStorage.getItem('token'))
    const response= await fetch(PostBlog,{
      method:'POST',
      body: data
    })
    const json = await response.json()
    if(json.success){
      navigate('/')
    }
    else{
      toast.error("Some error Occured", toastoptions)
    }
  }
  return (
    <>
      <Navbar/>
    <div className="create">
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="title" id="input" value={title} onChange={(ev)=>(settitle(ev.target.value))} required />
          <label htmlFor="input" className="label">
            Title
          </label>
          <div className="underline"></div>
        </div>
        <div className="input-container">
          <input type="summary" id="input" value={summary} onChange={ev=>{setsummary(ev.target.value)}} required />
          <label htmlFor="input" className="label">
            Summary
          </label>
          <div className="underline"></div>
        </div>
        <input type="File" className="fileinp" onChange={ev=>{setfiles(ev.target.files)}}/>
        
        <div className="qui">
          <ReactQuill value={content} onChange={ev=>{setcontent(ev)}} />
        </div>
        <button type="submit" className="f-btn">Create Post</button>
      </form>
      <ToastContainer/>
    </div>
    </>
  );
};

export default CreatePost;
