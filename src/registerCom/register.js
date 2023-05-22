import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import './register.css'
import Spinner from '../loader/loader';
//const regUrl = "https://booklistbackend-nx2z.onrender.com/register/user"
const regUrl = "http://localhost:5000/register/user"


function Register(){
    let [userName,setUserName] = useState("");
    let [password,setpassword] = useState("");
    let [confPassword,setconfPassword] = useState("");
    const [spinner,setSpinner] = useState(false);
     let navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();
        if(userName.length === 0){
            return alert("Please Give valid User Name")
        }
        if(password.length < 6 || password.length > 16){
            return alert("please enter password length in min 6  to  max 16 ")
        }
        if(password !== confPassword){
            return alert("Please enter both password correct")
        }
        let data = {
            email : userName,
            password:password

        }
        setSpinner(true);
        let res = await axios.post(regUrl,data)
        if(res.status === 200){
            setSpinner(false);
             navigate('/');
        }
        else if(res.status === 401){
            setSpinner(false);
            return alert("Sorry!! Try again")
        }
        

    }
    return(
        <>
        {spinner?<Spinner/>:""}
        <div className='reg_main_cont'>
            
            <div className='reg_card_cont'>
                <h1>Register</h1>
                <input type='text' placeholder='Username should Email' onBlur={(e)=>{setUserName(e.target.value)}}/>
                <input type='password' placeholder='password' onBlur={(e)=>{setpassword(e.target.value)}}/>
                <input type='password' placeholder='Confrim password'onBlur={(e)=>{setconfPassword(e.target.value)}}/>
                <button onClick={(e)=>handleRegister(e)}>Register</button>
                <Link to='/'><h3>Member Login</h3></Link>
            </div>
        </div>
        </>
    )
}

export default Register;