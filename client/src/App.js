import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Nav';
import Footer from './Footer';
import React, { createContext, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, Outlet, useNavigate } from "react-router-dom";
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

function App() {
    // Context
    const [credentials, setCredentials] = useState();
    const value = useMemo(() => ({ credentials, setCredentials }), [credentials]);

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [toastMessage, setToastMessage] = useState();
    const [toastState, setToastState] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/home');
        }

        // LoginService.authenticationHeartbeat()
        //     .then(loggedIn => {
        //         if (loggedIn) {
        //             console.log('heartbeat user is logged in');
        //             setLoggedIn(true);
        //             setCredentials(LoginService.getUserCredentials());
        //         } else {
        //             console.log('heartbeat user is logged out');
        //             setLoggedIn(false);
        //             setCredentials();
        //         }
        //     })

        if (isLoggedIn) {   // Send authentication heartbeat
            // console.log('setting credentials...');
            setCredentials(LoginService.getUserCredentials());
        } else {
            // console.log('clearing credentials...');
            setCredentials();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (toastMessage) {
            switch (toastState) {
                case 'error':
                    toast.error(toastMessage);
                    return;
                case 'info':
                    toast.info(toastMessage);
                    return;
            }
        }
    }, [toastMessage]);

    return (
        <div className="appContainer">
            <CredentialsContext.Provider value={value}>
                <NavBar
                    isLoggedIn={isLoggedIn}
                    setLoggedInCallback={setLoggedIn}
                    setToastMessageCallback={setToastMessage}
                    setToastStateCallback={setToastState}
                />
                <Outlet context={
                    { isLoggedIn, setLoggedIn, credentials, setCredentials }
                } />
                <Footer />
                <ToastContainer />
            </CredentialsContext.Provider>
        </div>
    )
}

export default App;