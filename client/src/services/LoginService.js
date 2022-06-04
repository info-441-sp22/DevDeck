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
            throw new Error('User is logged out.');
        }

        // User is logged in
        return true;
    }

    static LogIn = async (loginRequest, setCredentials) => {
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
            const data = responsePayload.payload;
            // Store the user information that is grabbed
            setCredentials(data);
            this.storeUserCredentials(data);
            return responsePayload.message;
        } else {    // If an error is encountered
            // Return error payload with message
            throw new Error(responsePayload.error);
        }
    }

    static SignUp = async (signupRequest, setCredentials) => {
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

        return LoginService.LogIn(loginRequest, setCredentials);
    }

    static LogOut = async (setCredentials) => {
        const response = await fetch(
            LoginService.LOGIN_BASEPOINT() + '/logout',
            {
                method: 'DELETE',
                credentials: 'include'
            }
        );

        const responsePayload = await response.text();

        // Delete the user info in the storage
        setCredentials();
        this.removeUserCredentials();

        return responsePayload;
    }

    /** Session Storage functions */
    static storeUserCredentials = (data) => sessionStorage.setItem('user', JSON.stringify(data));
    static getUserCredentials = () => JSON.parse(sessionStorage.getItem('user'));
    static removeUserCredentials = () => sessionStorage.removeItem('user');
}