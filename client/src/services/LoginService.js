import { toast } from "react-toastify";
import { BASEPOINT } from "../App.js";

export class LoginService {
    static LOGIN_BASEPOINT = () => BASEPOINT + '/api/users';

    static authenticationHeartbeat = async () => {
        const response = await fetch(
            LoginService.LOGIN_BASEPOINT() + '/heartbeat',
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        const responseHeartbeat = await response.json();

        if (responseHeartbeat.error) {
            // Remove the session
            LoginService.removeUserCredentials('user');
            throw new Error('User is logged out.');
        }

        // User is logged in
        return true;
    }

    static LogIn = async (loginRequest, setLoggedInCallback) => {
        // Send the request
        const response = await fetch(
            LoginService.LOGIN_BASEPOINT() + '/login',
            {
                method: "POST",
                body: JSON.stringify(loginRequest),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responsePayload = await response.json();

        if (!responsePayload.error) {   // If no error is encountered
            // Store the user information that is grabbed
            sessionStorage.setItem('user', JSON.stringify(responsePayload.payload));
            setLoggedInCallback(true);
            return responsePayload.message;
        } else {    // If an error is encountered
            // Return error payload with message
            throw new Error(responsePayload.error);
        }
    }

    static SignUp = async (signupRequest, setLoggedInCallback) => {
        // Send the signup request
        const signupResponse = await fetch(
            LoginService.LOGIN_BASEPOINT() + '/signup',
            {
                method: "POST",
                body: JSON.stringify(signupRequest),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const signupResponsePayload = await signupResponse.json();

        // Error guard for an error when signing up
        if (signupResponsePayload.error) throw new Error(signupResponsePayload.error);

        // Rebuild request
        const loginRequest = {
            username: signupRequest.username,
            password: signupRequest.password
        }

        return LoginService.LogIn(loginRequest, setLoggedInCallback);
    }

    static LogOut = async (setLoggedInCallback) => {
        const response = await fetch(
            LoginService.LOGIN_BASEPOINT() + '/logout',
            {
                method: 'DELETE',
                credentials: 'include'
            }
        );

        const responsePayload = await response.text();

        // Delete the user info in the storage
        // document.cookie[0]
        LoginService.removeUserCredentials();
        setLoggedInCallback(false);

        return responsePayload;
    }

    /** Session Storage functions */
    static getUserCredentials = () => JSON.parse(sessionStorage.getItem('user'));
    static removeUserCredentials = () => sessionStorage.removeItem('user');
}