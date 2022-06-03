import { BASEPOINT } from "../App";

export class CommentService {
    static POST_BASEPOINT = () => BASEPOINT + '/api/comments';

    static getComments = async (postID) => {
        const response = await fetch(
            this.POST_BASEPOINT() + '/?postID=' + encodeURIComponent(postID),
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
            return responsePayload;
        } else {
            throw new Error(responsePayload.error);
        }
    }

    static postComment = async (postID, comment, username) => {
        const response = await fetch(
            this.POST_BASEPOINT(),
            {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    comment: comment,
                    postID: postID
                })

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