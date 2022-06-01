import { BASEPOINT } from "../App.js";

export class LoginService {
    static LOGIN_BASEPOINT = () => BASEPOINT + '/api/users';

    static handleUserUnauthenticated = async () => {
        
    }

    static LogIn = async (loginRequest) => {
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
            return responsePayload.message;
        } else {    // If an error is encountered
            // Return error payload with message
            throw new Error(responsePayload.error);
        }
    }

    static SignUp = async (signupRequest) => {
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

        return LoginService.LogIn(loginRequest);
    }

    static LogOut = async () => {
        const response = await fetch(
            LoginService.LOGIN_BASEPOINT() + '/logout',
            {
                method: 'POST'
            }
        );

        const responsePayload = await response.json();

        // Delete the user info in the storage
        LoginService.removeUserCredentials();

        return responsePayload.message;
    }

    /** Session Storage functions */
    static getUserCredentials = () => JSON.parse(sessionStorage.getItem('user'));
    static removeUserCredentials = () => sessionStorage.removeItem('user');
}