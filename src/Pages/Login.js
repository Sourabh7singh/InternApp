import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = ( props) => {
    const {isLoginpage} = props;
    const [data,setData] = useState({
        ...(!isLoginpage && {name:""}),
        email:"",
        password:""
    });
    const handleClicked=async()=>{
        if(!isLoginpage){
            const res = await fetch("http://localhost:8000/api/user/signup",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({"name":data.name,"email":data.email,"password":data.password})
            });
            const result = await res.json();
            if(result.authToken) alert("User Registered Successfully");
            else alert("Error, Please try again Later");
        }
        else{
            const res = await fetch("http://localhost:8000/api/user/login",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({"email":data.email,"password":data.password})
            });
            const result = await res.json();
            if(result.authToken) alert("Login Successfully");
            else alert("Error, Please try again Later");
        }
    }
  return (
    <div className='form-container'>
      <div className='main-form' id="form">
        <h2>Welcome</h2>
        {!isLoginpage?<p>Sign in to get started</p>:<p>Log in to the chat application</p>}
        {!isLoginpage?<><label htmlFor="name">Enter your Full-Name</label>
        <input onChange={(e)=>{setData({...data,name:e.target.value})}} value={data.name} type="text" name="name" id="name"/></>:""}
        <label htmlFor="email">Enter your Email address</label>
        <input onChange={(e)=>{setData({...data,email:e.target.value})}} value={data.email} type="email" name="email" id="email" />
        <label htmlFor="password">Enter your password</label>
        <input onChange={(e)=>{setData({...data,password:e.target.value})}} value={data.password} type="text" name="password" id="password" />
        <button className='submit-btn' onClick={(e)=>handleClicked(e)}>{isLoginpage?"Log in":"Signup"}</button>
        {!isLoginpage && <span>Already Have an account <Link to="/user/login" style={{display:"inline-block"}}>Login?</Link></span>}
        {isLoginpage && <span>Don't Have an account <Link to="/user/signin" style={{display:"inline-block"}}>create account?</Link></span>}
      </div>
    </div>
  )
}

export default Login
