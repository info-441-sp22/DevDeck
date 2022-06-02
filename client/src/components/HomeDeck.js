// HomeDeck should contain the top project cards in 3 categories
// Need to create Cards based on post fields (created in CreateProjectModal): 
// title, blurb, longer_description, url_link, collaborators
import { fetchJSON } from '../utils/utils.js';
import React, { useState, useEffect } from "react"; //import React Component
import { Button } from "reactstrap";
import { Card } from './Card.js';
import { BASEPOINT } from '../App.js';
import { PostService } from '../services/PostService.js';

function HomeDeck(props) {
    // const [featuredPosts, setFeaturedPosts] = useState(null);
    const [popularPosts, setPopularPosts] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const credentialsUsername = props.credentials ? props.credentials.username : ""

    const max_posts_to_display = 5;

    // Card Factory Handler
    const createTopCards = function (data) {
        return data.map((postCard, i) => <Card key={i} cardData={postCard} username={credentialsUsername} />)
    };

    useEffect(() => {
        PostService.findAllPosts()
            .then(allPosts => {
                // setFeaturedPosts(createTopCards(allPosts.payload.sort((post_a, post_b) => post_b.likes.length - post_a.likes.length).slice(0, max_posts_to_display)));
                setPopularPosts(createTopCards(allPosts.payload.sort((post_a, post_b) => post_b.likes.length - post_a.likes.length).slice(0, max_posts_to_display)));
                setRecentPosts(createTopCards(allPosts.payload.sort((post_a, post_b) => new Date(post_b.created_date).getTime() - new Date(post_a.created_date).getTime()).slice(0, max_posts_to_display)));
                console.log(allPosts.payload)
            })
    }, [])

    return (
        <div>
            {/* <div>
                <h2>Featured projects:</h2>
                <div className="row">
                    {featuredPosts}
                </div>
            </div> */}
            <hr />
            <div>
                <h2>Popular projects:</h2>
                <div className="row">
                    {popularPosts}
                </div>
            </div>
            <hr />
            <div>
                <h2>Recently Added projects:</h2>
                <div className="row">
                    {recentPosts}
                </div>
            </div>
        </div>
    )
}

// async function findPosts() {
//     let postsJSON = await fetchJSON(BASEPOINT + `/api/posts`)
//     return postsJSON;
// }


export default HomeDeck;
