// UserDeck should contain the project cards that the user has made
// Accepts props with username
// Need to create Cards based on post fields (created in CreateProjectModal): 
// title, blurb, longer_description, url_link, collaborators

import React, { useState, useEffect } from "react"; //import React Component
import { Button } from "reactstrap";

function UserDeck(props) {
    const [val, setVal] = useState("");

    console.log("Username", props.username); // username is undefined 
    // findPosts();

    return (
        <div>            
            <Button color="primary">Test UserDeck</Button>

            {/* <Card title={title}></Card> */}
        </div>
        
    )
}

// async function findPosts() {
//     let postsJSON = await fetchJSON(`api/posts?username=${props.username}`)
//     console.log(postsJSON);
// }

export default UserDeck;

/*
router.get('/', async function (req, res) {
    try {
        var username = req.query.username;
        let toReturn = [];

        // find all posts in mongodb database
        let allPosts = await req.models.Post.find();

        // for each of the urls, generate the html preview of the webpage
        for (let i = 0; i < allPosts.length; i++) {
            let post = allPosts[i];
            let preview = await getURLPreview(post.url);
            let newPost = {
                "description": post.description,
                "htmlPreview": preview,
                "username": post.username, // A5: added username
                "likes": post.likes, // A6: added likes
                "type": post.type, // creative component
                "id": post._id, // Mongodb built-in "_id" field with the key "id"
                "created_date": post.created_date
            };

            if (username) { // if query parameter is set
                if (post.username === username) {
                    toReturn.push(newPost); // send back just posts made by user
                }
            } else {
                toReturn.push(newPost); // send back all posts
            }
        }

        // return an array of json objects with their htmlPreviews and descriptions
        res.json(toReturn);

    } catch (error) { // catch errors
        console.log(error);
        res.status(500).json({ "status": "error", "error": error });
    }
});
*/