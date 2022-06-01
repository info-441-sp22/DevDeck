// UserDeck should contain the project cards that the user has made
// Accepts props with username
// Need to create Cards based on post fields (created in CreateProjectModal): 
// title, blurb, longer_description, url_link, tech_stack, collaborators

import React, { useState, useEffect } from "react"; //import React Component
// import { Button } from "reactstrap";
import { Card } from "../components/Card.js";
import { fetchJSON } from '../utils/utils.js';
import { BASEPOINT } from "../App";

function UserDeck(props) {
    // const [val, setVal] = useState("");
    let userPosts = [];

    // let postsJSON = findPosts(props)
    findPosts(props)
        .then(data => {
            // console.log(data)
            for (let i = 0; i < data.length; i++) {
                let post = data[i];
                // console.log(post);
                userPosts.push(<Card
                    key={i}
                    post={post}
                    username={props.username}>
                </Card>);
            }
            // console.log("user posts", userPosts);
        })

    console.log("user posts", userPosts);
    // document.getElementById("testspan").innerHTML = userPosts;

    let testTitle = "Test title";

    return (
        <div>
            {userPosts}
            {/* {userPosts.map((postCard) => <div>{postCard}</div>)} */}

            {/* <Button color="primary" onClick={() => console.log("Click")}>Test UserDeck</Button> */}
            {/* <span id="testspan"></span> */}

            <Card title={testTitle}></Card>
        </div>

    )
}

// call api/posts GET endpoint, filtering for posts created by user
async function findPosts(props) {
    let postsJSON = await fetchJSON(BASEPOINT + `/api/posts?username=${props.username}`);
    return postsJSON;
}

export default UserDeck;