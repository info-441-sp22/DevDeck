import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Nav';
import Footer from './Footer';
import React, { useEffect } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";


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
            <Outlet />
            <Footer />
        </div>
    )
}