import React from 'react'
import Navbar from '../Navbar'
import events1 from '../../Assets/Images/events1.jpg'
import events2 from '../../Assets/Images/events2.jpg'
import events3 from '../../Assets/Images/events3.jpg'
import events4 from '../../Assets/Images/events4.jpg'
const Events = () => {
    return (
        <>
            <Navbar />
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="3000">
                        <img src={events1} class="d-block w-100" alt="..." style={{height:"500px",objectFit:"cover"}}/>
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src={events2} class="d-block w-100" alt="..." style={{height:"500px",objectFit:"cover"}}/>
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src={events3} class="d-block w-100" alt="..." style={{height:"500px",objectFit:"cover"}}/>
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src={events4} class="d-block w-100" alt="..." style={{height:"500px",objectFit:"cover"}}/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Events
