import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Button,
    Container
} from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import { LoginService } from './services/LoginService';
import { CredentialsContext, RefreshRootContext } from './App';
import { toast } from 'react-toastify';

function NavBar(props) {
    const { setCredentials, credentials } = useContext(CredentialsContext);
    const { setRefresh } = useContext(RefreshRootContext);
    // const setLoggedInCallback = props.setLoggedInCallback;

    const handleLogOut = async () => {
        LoginService.LogOut(setCredentials)
            .then((payload) => toast.info(payload));    // Notify user of the successful logout
    }

    useEffect(() => {
        setRefresh(true);
    }, [])

    return (
        <Navbar bg="custom" variant="dark" expand="sm" sticky="top" className="navbar">
            <Container>
                <Navbar.Brand as={Link} to="/home" className="logo">
                <img
                    src="../imgs/DevDeck_card.png"
                    height="45"
                    width="35"
                    className="mr-3"
                    alt="DevDeck Logo"
                />DevDeck</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        {
                            (!credentials)   
                                ?   <div className="login-container">
                                        <div className="login-button">
                                            <LoginModal
                                                // setLoggedInCallback={setLoggedInCallback}
                                            />
                                        </div>
                                        <div className="login-button">
                                            <SignupModal
                                                // setLoggedInCallback={setLoggedInCallback}
                                            />
                                        </div>
                                    </div>
                                :   <div className="login-text-container">
                                        <div className="login-text-item login-text">
                                            <p>Hello, {credentials.first_name}</p>
                                        </div>
                                        <div className="login-text-item">
                                            <Button variant="light" onClick={handleLogOut}>Log out</Button>
                                        </div>
                                        <Nav >
                                            <a href={"/profile/" + credentials.username}>
                                                <img
                                                    src="../imgs/profile_default.png"                    
                                                    height="35"
                                                    width="35"
                                                    className="mr-3 profile-pic-navbar"
                                                    alt="User's profile"
                                                    href={"/profile/" + credentials.username}
                                                />
                                            </a>
                                        </Nav>
                                    </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;