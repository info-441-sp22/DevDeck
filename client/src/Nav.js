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
        
    }, [isLoggedIn]);

    return (
        <Navbar bg="custom" variant="dark" expand="sm" sticky="top" className="navbar">
            <Container>
                <Navbar.Brand as={Link} exact to="/" className="logo">
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
                        <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
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
                                            <p>Hello, {LoginService.grabUserInfo().first_name}</p>
                                        </div>
                                        <div className="login-text-item">
                                            <Button variant="primary" onClick={handleLogOut}>Log Out</Button>
                                        </div>
                                    </div>
                        }
                    <Nav.Link href="/profile">
                        <img
                            src="imgs/profile_default.png"                    
                            height="35"
                            width="35"
                            className="mr-3 profile-pic-navbar"
                            alt="User's profile"
                        />
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;