import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
// const regUrl = "https://booklistbackend-nx2z.onrender.com/login/user"
const regUrl = "http://localhost:5000/login/user"


function Login(){
    let [userName,setUserName] = useState("");
    let [password,setpassword] = useState("");
     let navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        if(userName.length === 0){
            return alert("Please Give valid User Name")
        }
        if(password.length < 6 || password.length > 16){
            return alert("please enter password length in min 6  to  max 16 ")
        }
        let data = {
            email : userName,
            password:password

        }
        let res = await axios.post(regUrl,data);
        console.log(res)
        if(res.status === 200){
            console.log(res.data.token);
            window.localStorage.setItem('token',res.data.token)
             navigate('/home');
        }
        else if(res.status === 401){
            return alert("Sorry!! Try again")
        }
        

    }
    return(
        <div>
            <div>
                <h1>Member Login</h1>
                <input type='text' placeholder='Username should Email' onBlur={(e)=>{setUserName(e.target.value)}}/>
                <input type='password' placeholder='password' onBlur={(e)=>{setpassword(e.target.value)}}/>
                <button onClick={(e)=>handleLogin(e)}>Login</button>
                <h3>Forget Password</h3>
                <Link to='/register'><h2>Register user</h2></Link>
            </div>
        </div>
    )
}

export default Login;