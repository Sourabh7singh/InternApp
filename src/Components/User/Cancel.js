import React from 'react'
import Navbar from '../Navbar';

const Cancel = () => {
    setTimeout(() => {
        window.location.href = "/user";
    }, 2000);
    return (
        <>
            <Navbar />
            <section>
                <p>Forgot to add something to your cart? Shop around then come back to pay!</p>
            </section>
        </>
    )
}

export default Cancel
