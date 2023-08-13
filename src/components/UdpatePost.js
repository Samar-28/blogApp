import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { PostBlog } from "../utils/ApiRoutes";
import blogContext from '../context/blogs/blogContext';
const UdpatePost = () => {
  const context = useContext(blogContext);
  const {blog,getBlog}=context;
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState("");
  const {id}=useParams();
  useEffect(() => {
    settitle(blog.title);
    setsummary(blog.summary);
    setcontent(blog.content);
  }, [blog])
  
  useEffect(() => {
    getBlog(id);
    }, [])
    
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
  
    data.append('id',id)
    data.append('token',localStorage.getItem('token'))
    const response= await fetch(PostBlog,{
      method:'PUT',
      body: data
    })
    const json = await response.json()
    if(json.success){
      setTimeout(() => {
        navigate('/')
      }, 1000);
      toast.success("Post Upadated Successfully",toastoptions);
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
          <button type="submit" className="f-btn">Update Post</button>
        </form>
        <ToastContainer/>
      </div>
      </>
    );
}

export default UdpatePost
