import React, { createContext, useEffect, useState } from 'react'

export const DataContext = createContext();
const DataState = (props) => {
    const [products,setProduct]=useState([]);
    const [events,setEvents]=useState([]);
    const [isAdmin,setAdmin]=useState(JSON.parse(localStorage.getItem('isAdmin'))||false);
    const fetchData =async()=>{
        const products = await fetch("http://localhost:8000/api/product/fetch",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        const parsedProducts = await products.json();
        setProduct(parsedProducts);
        const event = await fetch("http://localhost:8000/api/events",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        const parsedEvents = await event.json();
        setEvents(parsedEvents);
    }
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    },[]);
  return (
    <DataContext.Provider value={{events,products,isAdmin,setAdmin,fetchData}}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataState
