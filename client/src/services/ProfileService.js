import { BASEPOINT } from "../App";

export class ProfileService {
    static PROFILE_BASEPOINT = () => BASEPOINT + '/api/users';

    static getProfile = async (username) => {
        const response = await fetch(
            ProfileService.PROFILE_BASEPOINT() + '/?username=' + encodeURIComponent(username),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responsePayload = await response.json();

        if (!responsePayload.error) {   // If no error is encountered
            return responsePayload.payload;
        } else {    // If an error is encountered
            // Return error payload with message
            throw new Error(responsePayload.error);
        }
    }
}