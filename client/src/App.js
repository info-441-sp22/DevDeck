import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Nav';
import Footer from './Footer';
import React, { createContext, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Outlet, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';
import { LoginService } from './services/LoginService';

const DEBUG = true;
export const BASEPOINT = (DEBUG) ? 'http://localhost:3000' : 'https://www.devdeck.me';

// Contexts
export const CredentialsContext = createContext({
    credentials: null,
    setCredentials: () => {}
});

export const RefreshRootContext = createContext({
    refresh: true,
    setRefresh: () => {}
});

function App() {
    // Context
    const [credentials, setCredentials] = useState();
    const [refreshRoot, setRefresh] = useState();
    const value = useMemo(() => ({ credentials, setCredentials }), [credentials]);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/home');
        }

        LoginService.authenticationHeartbeat()
            .then(loggedIn => {
                if (loggedIn) {
                    // setLoggedIn(true);
                    setCredentials(LoginService.getUserCredentials());
                    setRefresh(false);
                }
            })
            .catch((err) => {
                // setLoggedIn(false);
                // setCredentials();
                LoginService.removeUserCredentials();
                setRefresh(false);
            });
    }, [refreshRoot]);

    return (
        <div className="appContainer">
            <CredentialsContext.Provider value={value}>
                <NavBar />
                <Outlet />
                <Footer />
                <ToastContainer />
            </CredentialsContext.Provider>
        </div>
    )
}

export default App;