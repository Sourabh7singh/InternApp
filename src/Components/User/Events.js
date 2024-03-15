import React, { useContext } from 'react'
import Navbar from '../Navbar'
import events1 from '../../Assets/Images/events1.jpg'
import events2 from '../../Assets/Images/events2.jpg'
import events3 from '../../Assets/Images/events3.jpg'
import events4 from '../../Assets/Images/events4.jpg'
import { DataContext } from '../DataState';
import { Link } from 'react-router-dom'
const Events = () => {
    const {events} = useContext(DataContext);
    return (
        <>
            <Navbar />
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src={events1} className="d-block w-100" alt="..." style={{ height: "500px", objectFit: "cover" }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Event-1</h5>
                            <p>Some representative placeholder content for Event1 slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={events2} className="d-block w-100" alt="..." style={{ height: "500px", objectFit: "cover" }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Event-2</h5>
                            <p>Some representative placeholder content for the Event2 slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={events3} className="d-block w-100" alt="..." style={{ height: "500px", objectFit: "cover" }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Event-3</h5>
                            <p>Some representative placeholder content for Event3 slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={events4} className="d-block w-100" alt="..." style={{ height: "500px", objectFit: "cover" }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Event-4</h5>
                            <p>Some representative placeholder content for Event4 slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <h5 className='text-center m-4 p-3  font-monospace' style={{borderTop:"2px solid black"}}>List of On-going events</h5>
            {events &&
                events.map((item,index)=>{
                    return <div key={index} className="card m-5">
                    <h5 className="card-header">Main-Event {index+1}</h5>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <Link href="/" className="btn btn-primary">Join the Event</Link>
                    </div>
                </div>
                })
            }
        </>
    )
}

export default Events
