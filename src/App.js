import logo from './logo.svg';
import './App.css';
import {Route, Routes } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import BlogState from './context/blogs/BlogState';
import CreatePost from './components/CreatePost';
import Blog from './components/Blog';
import UdpatePost from './components/UdpatePost';
import SetAvatar from './components/SetAvatar';
import Profile from './components/Profile';

function App() {
  return (
    <>
    <BlogState>
    <Routes>
      <Route exact path="/" element={<Main/>} />
      <Route exact path="/blog" element={<Main/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<SignUp/>} />
      <Route exact path="/create" element={<CreatePost/>} />
      <Route exact path="/post/:id" element={<Blog/>} />
      <Route exact path="/update/:id" element={<UdpatePost/>} />
      <Route exact path="/setavatar" element={<SetAvatar/>} />
      <Route exact path="/profile" element={<Profile/>} />
    </Routes>
    </BlogState>
    </>
  );
}

export default App;
