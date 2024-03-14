import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { DataContext } from '../DataState';

const Productdetails = () => {
    const navigate = useNavigate();
    const {data} = useContext(DataContext);
    const [product, setProduct] = useState();
    const currentProduct = localStorage.getItem("CurrentProduct");
    useEffect(() => {
        if (!currentProduct) {
            navigate("/user/products");
        }
        else {
            setProduct(data.filter((item)=>{return item._id === currentProduct})[0]);
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <Navbar />
            <div className='container top-50 absolute'>
                {
                    product &&
                    <div className="product">
                        <div className="img">
                            <img src={product.image} alt="" className='h-100 w-100' />
                        </div>
                        <div className="details fs-3 ">
                            <p>Course {product.id}</p>
                        </div>
                        <div className="description">
                            <h5>Description</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia magni ea, explicabo non facilis tempora mollitia consequuntur doloribus magnam, voluptatem corrupti quam. Eveniet explicabo accusamus possimus dolores nam eligendi recusandae sunt illo alias laudantium.</p>
                        </div>
                        <div className="tutors">
                            <h5>
                                Specialization
                            </h5>
                            <p>{product.description}</p>
                        </div>
                        <div className="price">
                            <h3>Price: {product.price}/-</h3>
                        </div>
                        <div className="buy">
                            <button className='btn btn-primary'>Buy This course</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Productdetails
