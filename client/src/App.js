import { Link, Outlet } from "react-router-dom";
import NavBar from './Nav';

export default function App() {
    return (
        // <div>
        <div className="appContainer">
            {/* <h1>DevDeck</h1> */}
            <NavBar />
            {/* <nav>
                <Link to="/home">Home</Link> |{" "}
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/project">Project Details</Link>
            </nav>
            <Outlet /> */}
        </div>
    )
}