import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../Components/DataState';

const Login = ( props) => {
    const {isAdmin,setAdmin} = useContext(DataContext);
    const {isLoginpage} = props;
    const [data,setData] = useState({
        ...(!isLoginpage && {name:""}),
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const handleClicked=async(e)=>{
      e.preventDefault();
        if(!isLoginpage){
            const res = await fetch("http://localhost:8000/api/user/signup",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({"name":data.name,"email":data.email,"password":data.password})
            });
            const result = await res.json();
            if(result.authToken){
              alert("User Registered Successfully");
              localStorage.setItem("authToken",result.authToken);
              navigate("/");
              // Navigate("/");
            } 
            else alert("Error, Please try again Later");
          }
          else{
            const res = await fetch("http://localhost:8000/api/user/login",{
              method:"POST",
              headers:{"Content-Type": "application/json"},
              body:JSON.stringify({"email":data.email,"password":data.password})
            });
            const result = await res.json();
            if(result.authToken){
              alert("Login Successfully");
              localStorage.setItem("authToken",result.authToken);
              navigate("/");
              // Navigate("/");
            } 
            else{
              alert("Error, Please try again Later");
            } 
              
        }
    }
  return (
    <form className='form-container'>
      <div className='main-form' id="form">
        <h2>Welcome {}</h2>
        {!isLoginpage?<p>Sign in to get started</p>:<p>Log in to the application</p>}
        {!isLoginpage?<><label htmlFor="name">Enter your Full-Name</label>
        <input onChange={(e)=>{setData({...data,name:e.target.value})}} value={data.name} type="text" name="name" id="name"/></>:""}
        <label htmlFor="email">Enter your Email address</label>
        <input onChange={(e)=>{setData({...data,email:e.target.value})}} value={data.email} type="email" name="email" id="email" />
        <label htmlFor="password">Enter your password</label>
        <input onChange={(e)=>{setData({...data,password:e.target.value})}} value={data.password} type="text" name="password" id="password" />
        <button type="submit" className='submit-btn' onSubmit={(e)=>handleClicked(e)} onClick={(e)=>handleClicked(e)}>{isLoginpage?"Log in":"Signup"}</button>
        {!isLoginpage && <span>Already Have an account <Link to="/user/login" style={{display:"inline-block"}}>Login?</Link></span>}
        {isLoginpage && <span>Don't Have an account <Link to="/user/signin" style={{display:"inline-block"}}>create account?</Link></span>}
      </div>
    </form>
  )
}

export default Login
