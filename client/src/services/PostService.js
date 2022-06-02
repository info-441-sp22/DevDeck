import { BASEPOINT } from "../App";
import { fetchJSON } from "../utils/utils";

export class PostService {
    static POST_BASEPOINT = () => BASEPOINT + '/api/posts';

    static findPosts = async (request) => {
        const username = request.username;

        const response = await fetch(
            this.POST_BASEPOINT() + '/?username=' + encodeURIComponent(username),
            {
                method: 'GET',
                credentials: 'include'
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
        return await fetchJSON(this.POST_BASEPOINT());
    }


    static likePost = async (postID, username) => {
        // console.log('calling post service like post')
        const response =  fetchJSON(this.POST_BASEPOINT() + '/like', {
            method: "POST",
            body: { postID: postID, username: username }
        })
        const responsePayload = await response.json();

        if (!responsePayload.error) {
            return responsePayload.payload;
        } else {
            throw new Error(responsePayload.error);
        }
    }


    static unlikePost = async (postID, username) => {
        const response =  await fetchJSON(this.POST_BASEPOINT() + '/unlike', {
            method: "POST",
            body: { postID: postID, username: username }
        })
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
                credentials: 'include'
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