// HomeDeck should contain the top project cards in 3 categories
// Need to create Cards based on post fields (created in CreateProjectModal): 
// title, blurb, longer_description, url_link, collaborators
import { fetchJSON } from '../utils/utils.js';
import React, { useState, useEffect } from "react"; //import React Component
import { Button } from "reactstrap";
import { Card } from './Card.js';
import { BASEPOINT } from '../App.js';
import { PostService } from '../services/PostService.js';
import { ImageService } from '../services/ImageService.js';

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
                    
                    // Random

                    var randomPosts = [];
                    var holder = [];

                    while (randomPosts.length !== 3) {
                        const index = Math.floor(Math.random() * allPosts.length);

                        if (!holder.includes(index)) {
                            randomPosts.push(allPosts[index]);
                            holder.push(index);
                        }
                    }
                    setFeaturedPosts(createTopCards(randomPosts));
                    setPopularPosts(createTopCards(allPosts.sort((post_a, post_b) => post_b.likes.length - post_a.likes.length).slice(0, 3)));
                    setRecentPosts(createTopCards(allPosts.sort((post_a, post_b) => new Date(post_b.created_date).getTime() - new Date(post_a.created_date).getTime()).slice(0, 3)));
                    setLoading(false);  // <-- Remember to change loading to no load no more!
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
