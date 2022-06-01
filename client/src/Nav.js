import React, { useState } from 'react';
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

function NavBar(props) {
    const isLoggedIn = props.isLoggedIn;
    const setLoggedInCallback = props.setLoggedInCallback;
    const setToastMessageCallback = props.setToastMessageCallback;
    const setToastStateCallback = props.setToastStateCallback;

    const handleLogOut = async () => {
        LoginService.LogOut()
            .then((payload) => {
                setToastMessageCallback('' + payload);
                setToastStateCallback('info');
                setLoggedInCallback(false)
            });
    }

    useState(() => {
        // Handle navbar session dynamics
        setLoggedInCallback(!LoginService.getUserCredentials() ? false : true);
        // @TODO handle unauthenticated 401
    }, [isLoggedIn]);

    return (
        <Navbar bg="custom" variant="dark" expand="sm" sticky="top" className="navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="logo">
                <img
                    src="imgs/DevDeck_card.png"
                    height="45"
                    width="35"
                    className="mr-3"
                    alt="DevDeck Logo"
                />DevDeck</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* @TODO take out */}
                        <Nav.Link as={NavLink} to="/project">Project Details</Nav.Link>
                        {/* activeClassName="active" */}
                    </Nav>
                    <Nav>
                        {
                            (!isLoggedIn)   
                                ?   <div className="login-container">
                                        <div className="login-button">
                                            <LoginModal
                                                setLoggedInCallback={setLoggedInCallback} 
                                                setToastMessageCallback={setToastMessageCallback}
                                                setToastStateCallback={setToastStateCallback}
                                            />
                                        </div>
                                        <div className="login-button">
                                            <SignupModal
                                                setLoggedInCallback={setLoggedInCallback}
                                                setToastMessageCallback={setToastMessageCallback}
                                                setToastStateCallback={setToastStateCallback}
                                            />
                                        </div>
                                    </div>
                                :   <div className="login-text-container">
                                        <div className="login-text-item login-text">
                                            <p>Hello, {LoginService.getUserCredentials().first_name}.</p>
                                        </div>
                                        <div className="login-text-item">
                                            <Button variant="primary" onClick={handleLogOut}>Log Out</Button>
                                        </div>
                                        <Nav.Link as={NavLink} to={"/profile/" + LoginService.getUserCredentials().username}>
                                            <img
                                                src="imgs/profile_default.png"                    
                                                height="35"
                                                width="35"
                                                className="mr-3 profile-pic-navbar"
                                                alt="User's profile"
                                            />
                                        </Nav.Link>
                                    </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;