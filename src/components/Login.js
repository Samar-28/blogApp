import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LogInRoute } from '../utils/ApiRoutes';
const Login = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [])
  
    const toastoptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const [cred, setcred] = useState({ email: "", password: "" })
    const onchange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(LogInRoute,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cred)
            }
        )
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate('/');
        }
        else {
            toast.error(json.error, toastoptions)
        }
    }

  return (
    <div className='login-con'>
      <form className="form" onSubmit={handlesubmit}>
        <p className="title">Login</p>
        <p className="message">Signup now and get to enjoy our app. </p>
        <label>
          <input required placeholder="" type="email" className="input" name="email" onChange={onchange}/>
          <span>Email</span>
        </label>

        <label>
          <input required placeholder="" type="password" className="input" name="password" onChange={onchange}/>
          <span>Password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Don't have an acount ? <Link to="/signup">SignUp</Link>{" "}
        </p>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
