import React, { useContext } from 'react'
import Navbar from '../Navbar'
import { DataContext } from '../DataState';

const Dashboard = () => {
  const {isAdmin} = useContext(DataContext);
  console.log(isAdmin);
  return (
    <>
    <Navbar/>
    Admin Dashboard
    </>
  )
}

export default Dashboard
