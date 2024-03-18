import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './DataState'

const Navbar = () => {
    const {isAdmin} = useContext(DataContext);
    // console.log(isAdmin);
    const handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userId");
        window.location.href="/user/login";
    }
    return (
        <nav className="navbar bg-body-tertiary " data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CourseMania</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">CourseMania</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={isAdmin?"/admin":"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={isAdmin?"/admin/events":"/user/events"}>Events</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={(e)=>handleLogout(e)}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
