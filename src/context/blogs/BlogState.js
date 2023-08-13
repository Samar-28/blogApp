import { useState } from "react";
import blogContext from "./blogContext";
import { GetBlog, GetBlogs, GetUser, GetUserBlogs, changeName, changePass, isLikedRoute } from "../../utils/ApiRoutes";
const BlogState = (props)=>{
  const [currUser, setcurrUser] = useState(null)
  const [blogs, setblogs] = useState([])
  const [blog, setblog] = useState({})
  const [userblogs, setuserblogs] = useState({})

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [npassword, setNpassword] = useState()
  

  const changeUsername = async () => {

     const response  = await fetch(changeName,{
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        'newName': username,
        'pass': password
      })
     })
     const json = await response.json();

     if(json.success){
        return true;
     }
     else{
        return false;
     }
  }
  const changePassword = async () => {

     const response  = await fetch(changePass,{
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        'oldPass': password,
        'NewPass': npassword
      })
     })

     const json = await response.json();

     if(json.success){
        return true;
     }
     else{
        return false;
     }
  }

  const getUser = async () => {
    const response = await fetch(GetUser, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const user = await response.json();
    setcurrUser(user);
  }

  const getBlogs = async () =>{
    const response = await fetch(GetBlogs);
    const json = await response.json();
    setblogs(json.blogs);
  }
  const getBlog = async (id) =>{
    const response = await fetch(`${GetBlog}/${id}`);
    const json = await response.json();
    setblog(json.blog);
  }
  const getUserBlogs = async () =>{
    const token=localStorage.getItem('token');
    const response = await fetch(GetUserBlogs,{
      headers:{
        'Content-Type': 'application/json',
        'auth-token':token
      }
    });
    const json = await response.json();
    setuserblogs(json.blog);
  }

    return(
        <blogContext.Provider value={{currUser,getBlogs,blogs,blog,getBlog,getUser,getUserBlogs,userblogs,changeUsername,username,password,setPassword,setUsername,npassword,setNpassword,changePassword}}>
            {props.children}
        </blogContext.Provider>
    )

}

export default BlogState;