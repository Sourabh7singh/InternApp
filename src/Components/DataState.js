import React, { createContext, useEffect, useState } from 'react'

export const DataContext = createContext();
const DataState = (props) => {
    const [data,setData]=useState([]);
    const fetchData =async()=>{
        const res = await fetch("http://localhost:8000/api/product/fetch",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        const result = await res.json();
        setData(result);
    }
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    },[]);
  return (
    <DataContext.Provider value={{data}}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataState
