import React, { createContext, useEffect, useState } from 'react'
export const DataContext = createContext();
const DataState = (props) => {
    const [products,setProduct]=useState([]);
    const ServerUrl = "https://internapp.onrender.com";
    const [events,setEvents]=useState([]);
    const [joinedEvents,setjoinedEvents]=useState([]);
    const [isAdmin,setAdmin]=useState(JSON.parse(localStorage.getItem('isAdmin'))||false);
    const userId = localStorage.getItem("userId");
    const fetchData =async()=>{
        const products = await fetch(`${ServerUrl}/api/product/fetch`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        const parsedProducts = await products.json();
        setProduct(parsedProducts);
        const event = await fetch(`${ServerUrl}/api/events`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        const parsedEvents = await event.json();
        setEvents(parsedEvents.filter(item => !item.joinedBy.includes(userId)));
        setjoinedEvents(parsedEvents.filter(item => item.joinedBy.includes(userId)));
    }
    function convertTo12HourFormat(time24) {
        var timeSplit = time24.split(':');
        var hours = parseInt(timeSplit[0]);
        var minutes = parseInt(timeSplit[1]);
        var suffix = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var time12 = hours + ':' + minutes + ' ' + suffix;
        return time12;
    }
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    },[]);
  return (
    <DataContext.Provider value={{events,products,isAdmin,setAdmin,fetchData,convertTo12HourFormat,ServerUrl,joinedEvents}}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataState
