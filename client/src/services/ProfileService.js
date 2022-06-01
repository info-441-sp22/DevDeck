import { BASEPOINT } from "../App";
import { ImageService } from "./ImageService";

export class ProfileService {
    static PROFILE_BASEPOINT = () => BASEPOINT + '/api/users';

    static getProfile = async (username) => {
        const response = await fetch(
            ProfileService.PROFILE_BASEPOINT() + '/?username=' + encodeURIComponent(username),
            {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responsePayload = await response.json();

        // Get the profile image
        const imagePayload = await ImageService.getProfileImage({ username: username });

        if (!responsePayload.error) {   // If no error is encountered
            return {
                user_info: responsePayload.payload,
                profile_img: imagePayload
            }
        } else {    // If an error is encountered
            // Return error payload with message
            throw new Error(responsePayload.error);
        }
    }

    static putProfile = async (username, bio) => {
        const response = await fetch(
            ProfileService.PROFILE_BASEPOINT() + '/?username=' + encodeURIComponent(username),
            {
                method: "PUT",
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username": username, "bio": bio })
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