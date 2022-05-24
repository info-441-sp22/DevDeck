import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Nav';
import Footer from './Footer';
import React, { useEffect } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import './styles/index.css';

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/home');
        }
    });

    return (
        <div className="appContainer">
            <NavBar />
            {/* { <nav>
                <Link to="/home">Home</Link> |{" "}
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/project">Project Details</Link>
            </nav> */}

            <Outlet />
            <Footer />
        </div>
    )
}