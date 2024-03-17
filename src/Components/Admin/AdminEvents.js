import React, { useContext } from 'react'
import Navbar from '../Navbar'
import { DataContext } from '../DataState';

const AdminEvents = () => {
    const { events,fetchData } = useContext(DataContext);
    const HandleDelete=async(id)=>{
        const res = await fetch(`http://localhost:8000/api/events/delete`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        })
        const result = await res.json();
        alert(result.msg);
        fetchData();
    }
    const HandleUpdate=(id)=>{
        console.log(id);
        console.log("Updated");
    }
    return (
        <>
            <Navbar />
            <h6 className='fs-3 text-center  font-monospace m-3'>All On-Going Events</h6>
            {events && events.map((item, index) => {
                return <div key={index} className="card m-5">
                    <div className="card-header">
                        Event {index+1}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text"><strong>Description:</strong> {item.description}</p>
                        <p className="card-text"><strong>Date:</strong> {item.date.slice(0, 10)}</p>
                        <p className="card-text"><strong>Time:</strong> {item.date.slice(11, 16)}</p>
                        <button className="btn btn-primary m-1" onClick={()=>HandleUpdate(item._id)}>Update</button>
                        <button className="btn btn-primary m-1" onClick={()=>HandleDelete(item._id)}>Delete</button>
                    </div>
                </div>
            })}

        </>
    )
}

export default AdminEvents
