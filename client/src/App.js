import { Link, Outlet } from "react-router-dom";

export default function App() {
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