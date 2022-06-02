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
    const [featuredPosts, setFeaturedPosts] = useState(null);
    const [popularPosts, setPopularPosts] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const credentialsUsername = props.credentials ? props.credentials.username : ""

    // Card Factory Handler
    const createTopCards = function (data) {
        return data.map((postCard, i) => <Card 
                                            key={i} 
                                            cardData={postCard} 
                                            username={credentialsUsername} 
                                            setLoadingCallback={setLoading}
                                        />)
    };

    useEffect(() => {
        if (isLoading) {
            PostService.findAllPosts()
                .then(allPosts => {
                    setFeaturedPosts(createTopCards(allPosts.sort((post_a, post_b) => post_b.likes.length - post_a.likes.length).slice(0, 3)));
                    setPopularPosts(createTopCards(allPosts.sort((post_a, post_b) => post_b.likes.length - post_a.likes.length).slice(0, 3)));
                    setRecentPosts(createTopCards(allPosts.sort((post_a, post_b) => post_b.created_date - post_a.created_date).slice(0, 3)));
                    // console.log(featuredPosts)
                    setLoading(false);
                });
        }
    }, [isLoading])

    return (
        <div>
            <div>
                <h2>Featured projects:</h2>
                <div className="row">
                    {featuredPosts}
                </div>
            </div>
            <div>
                <h2>Recently Added projects:</h2>
                <div className="row">
                    {recentPosts}
                </div>
            </div>
            <div>
                <h2>Popular projects:</h2>
                <div className="row">
                    {popularPosts}
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
