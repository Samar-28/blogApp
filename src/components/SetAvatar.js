import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/ApiRoutes";
import axios from "axios";

export default function SetAvatar() {
    const navigate = useNavigate();
    const toastoptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const [avatar, setavatar] = useState([])
    const [load, setload] = useState(true)
    const [chosen, setchosen] = useState(undefined)
    const api = "https://api.multiavatar.com/45678945";
    const setProfilePic = async () => {
        if (chosen==undefined) {
            toast.error("Please Select An Avatar", toastoptions)
        }
        else{
            // console.log(avatar[chosen]);
            const token = localStorage.getItem('token')
            const data =  await fetch(`${setAvatarRoute}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':token
                },
                body: JSON.stringify({
                    image: avatar[chosen],
                })
            })
            const json=await data.json();
            console.log(json.isSet);
            if(json.isSet){
                navigate('/')
            }
            else{
                toast.error("Error Setting Avatar",toastoptions)
            }
        }
        }
    const getAva = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString('base64'));
            setavatar(data);
        }
        setload(false);
    }
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
        getAva();
    }, [])
    return (
        <>
            {
                load?<div className="ava-con">
                    <img className="loader" src={loader} alt="loader" />
                </div>:
            <div className="ava-con">
                <div className="titleCon">
                    <h1>Pick An Avatar As Your Profile Picture</h1>
                </div>
                <div className="avatars">
                    {avatar.map((ava, i) => {
                        return <div key={i} className={`Avatar ${chosen === i ? "selected" : ""} `}>
                            <img src={`data:image/svg+xml;base64,${ava}`} alt="Avatar" onClick={() => { setchosen(i) }} />
                        </div>
                    })}
                </div>
                <button className="submit sbt" onClick={setProfilePic}>Set As Profile Picture</button>
            </div>
        }
            <ToastContainer />
        </>
        )
    }