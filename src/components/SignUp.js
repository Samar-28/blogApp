import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SignUpRoute } from "../utils/ApiRoutes";

const SignUp = () => {
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
    const [cred, setcred] = useState({ name: "", semail: "", spassword: "", repassword: "" })
    const onchange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (cred.spassword === cred.repassword) {

            const creds = { name: cred.name, email: cred.semail, password: cred.spassword }
            const response = await fetch(SignUpRoute,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(creds)
                }
            )
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                navigate('/login');
            }
            else {
                toast.error(json.error, toastoptions)
            }
        }
        else {
            toast.error("Password Doesn't Match !", toastoptions)
        }
    }

  return (
    <div className="signup-con">
      <form className="form" onSubmit={handlesubmit}>
        <p className="title">Register </p>
        <p className="message">Signup now and get to enjoy our app. </p>
          <label>
            <input required placeholder="" type="text" className="input" name="name" onChange={onchange}/>
            <span>Username</span>
          </label>

        <label>
          <input required placeholder="" type="email" className="input" name="semail" onChange={onchange}/>
          <span>Email</span>
        </label>

        <label>
          <input required placeholder="" type="password" className="input" name="spassword" onChange={onchange}/>
          <span>Password</span>
        </label>
        <label>
          <input required placeholder="" type="password" className="input" name="repassword" onChange={onchange}/>
          <span>Confirm password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <Link to="/login">Signin</Link>{" "}
        </p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
