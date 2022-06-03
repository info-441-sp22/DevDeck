import { BASEPOINT } from "../App";
// import { fetchJSON } from "../utils/utils";
// import { ImageService } from "./ImageService";

export class PostService {
    static POST_BASEPOINT = () => BASEPOINT + '/api/posts';

    static findPosts = async (request) => {
        const username = request.username;

        const response = await fetch(
            this.POST_BASEPOINT() + '/?username=' + encodeURIComponent(username),
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }

            }
        );
        const responsePayload = await response.json();

        if (!responsePayload.error) {
            return responsePayload.payload;
        } else {
            throw new Error(responsePayload.error);
        }
    }

    static findAllPosts = async () => {
        const response = await fetch(
            this.POST_BASEPOINT(),
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }

            }
        );
        const responsePayload = await response.json();

        // Get post images
        // const imagePayload = await ImageService.getPostImages(responsePayload.payload);

        if (!responsePayload.error) {
            return responsePayload.payload;
        } else {
            throw new Error(responsePayload.error);
        }
    }


    static likePost = async (postID, username) => {
        const request = {
            postID: postID,
            username: username
        };
        
        const response = await fetch(
            this.POST_BASEPOINT() + '/like', 
            {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responsePayload = await response.json();

        if (!responsePayload.error) {
            return responsePayload.payload;
        } else {
            throw new Error(responsePayload.error);
        }
    }


    static unlikePost = async (postID, username) => {
        const request = {
            postID: postID,
            username: username
        };

        const response = await fetch(
            this.POST_BASEPOINT() + '/unlike', 
            {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responsePayload = await response.json();

        if (!responsePayload.error) {
            return responsePayload.payload;
        } else {
            throw new Error(responsePayload.error);
        }
    }

    static findSinglePost = async (request) => {
        const id = request.id;

        const response = await fetch(
            this.POST_BASEPOINT() + '/single?id=' + encodeURIComponent(id),
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const responsePayload = await response.json();

        if (!responsePayload.error) {
            return responsePayload.payload;
        } else {
            throw new Error(responsePayload.error);
        }
    }
}