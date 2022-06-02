import React, { useState, useEffect } from "react"; //import React Component
import { Card } from "./Card.js";
import { fetchJSON } from '../utils/utils.js';
import { BASEPOINT } from "../App";
import { PostService } from "../services/PostService.js";

function UserDeck(props) {
    const username = props.username ? props.username : "";
    const [userPosts, setUserPosts] = useState([]);
    // create loading state

    useEffect(() => {
        // Build request object
        const request = {
            username: username
        };

        PostService.findPosts(request)
            .then(data => {
                console.log(data)
                // Building the card array
                setUserPosts(data.map((postCard, i) => <Card key={i} cardData={postCard} />));
                // Set loading to false
            });
    }, [])

    return (
        <div>
            {userPosts}
        </div>
    )
}

// call api/posts GET endpoint, filtering for posts created by user
async function findPosts(props) {
    let postsJSON = await fetchJSON(BASEPOINT + `/api/posts?username=${props.username}`);
    return postsJSON;
}

export default UserDeck;