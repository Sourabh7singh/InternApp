import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import card1 from '../../Assets/Images/card1.jpg'
import card2 from '../../Assets/Images/card2.jpg'
import card3 from '../../Assets/Images/card3.jpg'
import { useNavigate } from 'react-router-dom'
const LandingPage = () => {
    const [data,setData]=useState([]);
    const authToken = localStorage.getItem("authToken")||" ";
    useEffect(()=>{
      authToken===" "&& navigate("/user/login");
      // eslint-disable-next-line
    },[]);
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
    const navigate = useNavigate();
    const handleProductClick=(e,id)=>{
        e.preventDefault();
        localStorage.setItem("CurrentProduct",id);
        navigate("/user/product-details");
    }
    return (
        <>
            <Navbar />
            {/* top Crousel */}
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={card1} className="d-block w-100" alt="..."  style={{height:"500px",objectFit:"cover"}}/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Programming courses</h5>
                            <p>We offer some high quality courses.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={card2} className="d-block w-100" alt="..."  style={{height:"500px",objectFit:"cover"}}/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Complete courses</h5>
                            <p>Best Courses for your Expertise.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={card3} className="d-block w-100" alt="..."  style={{height:"500px",objectFit:"cover"}}/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Training Regiment</h5>
                            <p>Complete courses with training and placement guides.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-black rounded" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-black rounded" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* products */}
            <div className='container text-center m-5 ' style={{fontSize:"1.5rem"}}>
                <p>Products</p>
            </div>
            <div className="container d-grid gap-5 mt-2" style={{gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
                {data && data.map((item) => {
                    return <div key={item.id} className="card">
                        <img src={item.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Course {item.id}</h5>
                            <p className="card-text">Description: {item.description}</p>
                            <strong>
                                <p className="card-text">Price: {item.price}/- only</p>
                            </strong>
                            <button onClick={(e)=>handleProductClick(e,item._id)} className="btn btn-primary mt-2">Buy this Course</button>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default LandingPage
