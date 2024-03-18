import React, { useContext, useState } from 'react'
import Navbar from '../Navbar'
import { DataContext } from '../DataState';

const AdminEvents = () => {
    const { events, fetchData,convertTo12HourFormat } = useContext(DataContext);
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [date,setDate]=useState("");
    const [Id,setId]=useState("");
    const [isUpdating,setisUpdating]=useState(false);

    const HandleDelete = async (id) => {
        const res = await fetch(`http://localhost:8000/api/events/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
        const result = await res.json();
        alert(result.msg);
        fetchData();
    }
    const HandleUpdate = (id) => {
        setisUpdating(true);
        const event = events.find((event) => event._id === id);
        setName(event.name);
        setDescription(event.description);
        setId(event._id);
        setDate(event.date.slice(0,16));
    }
    const HandleEvent=async(e)=>{
        e.preventDefault();
        let url="http://localhost:8000/api/events/add";
        if(isUpdating){
            url = "http://localhost:8000/api/events/update";
        }
        const res = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:Id,name,description,date})
        })
        const result = await res.json();
        alert(result.msg);
        setisUpdating(false);
        setName("");
        setDescription("");
        setDate("");
        fetchData();
    }
    console.log(events);
    return (
        <>
            <Navbar />
            {/* Adding new events */}
            <form className='m-5' style={{border:"1px solid black",borderRadius:"15px",padding:"20px"}}>
                <h3 className='fs-3 text-center font-monospace'>Create a New Event</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter the name of the event</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date for the event</label>
                    <input type="datetime-local" className="form-control" id="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary m-auto d-block" onClick={(e)=>HandleEvent(e)} onSubmit={(e)=>HandleEvent(e)}>{isUpdating?"Update the Event":"Add the Event"}</button>
            </form>

            {/* Available Events */}
            <h6 className='fs-3 text-center  font-monospace m-3'>All On-Going Events</h6>
            {events && events.map((item, index) => <div key={index} className="card m-5">
                <div className="card-header">
                    Event {index + 1}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text"><strong>Description:</strong> {item.description}</p>
                    <p className="card-text"><strong>Date:</strong> {item.date.slice(0, 10)},<strong>Time:</strong> {convertTo12HourFormat(item.date.slice(11, 16))}</p>
                    <p className="card-text"><strong>Joined By:</strong> {item.joinedBy.length}</p>
                    <button className="btn btn-primary m-1" onClick={() => HandleUpdate(item._id)}>Update</button>
                    <button className="btn btn-primary m-1" onClick={() => HandleDelete(item._id)}>Delete</button>
                </div>
            </div>)}

        </>
    )
}

export default AdminEvents
