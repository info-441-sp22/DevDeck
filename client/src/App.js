import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/home');
        }
    });

    return (
        <div>
            <h1>Dev Deck</h1>
            {/* @TODO: nav bar here */}
            <nav>
                <Link to="/home">Home</Link> |{" "}
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/project">Project Details</Link>
            </nav>
            <Outlet />
            
        </div>
    )
}