import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { DataContext } from './DataState';

const Profile = () => {
  const {ServerUrl} = useContext(DataContext);
  const [name, setName] = useState('');
  const [ViewName, setViewName] = useState('');
  const [email, setEmail] = useState('');
  const userId = localStorage.getItem("userId");
  const fetchUser=async()=>{
    const userId = localStorage.getItem("userId");
    const res = await fetch(`${ServerUrl}/api/user/myprofile/${userId}`);
    const User = await res.json();
    setName(User.name);
    setViewName(User.name);
    setEmail(User.email);
  }
useEffect(()=>{
  fetchUser();
},[])

const handleSubmit = async(e) => {
  e.preventDefault();
  const res = await fetch(`${ServerUrl}/api/user/updateprofile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userId, name, email })
  })
  const result = await res.json();
  alert(result.msg);
  fetchUser();
};
  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="text-center mb-4">{ViewName!==" "?ViewName+"'s":"User's"} Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
