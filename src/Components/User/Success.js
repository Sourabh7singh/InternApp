import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar';
import { DataContext } from '../DataState';

const Success = () => {
    const {ServerUrl} = useContext(DataContext);
    const productId = localStorage.getItem("BeingPurchased");
    const userId = localStorage.getItem("userId");
    setTimeout(() => {
        localStorage.removeItem("BeingPurchased");
        window.location.href = "/user";
    }, 5000);
    useEffect(()=>{
        fetch(`${ServerUrl}api/product/purchased`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId,productId})
        }).then((res)=>res.json()).then((data)=>alert(data.msg)); 
        //eslint-disable-next-line
    },[]);
    return (
        <>
        <Navbar/>
            <section>
                <p>
                    We appreciate your business! If you have any questions, please email
                    You'll be redirected automatically to the main website in 5 seconds.
                </p>
            </section>
        </>
    )
}

export default Success
