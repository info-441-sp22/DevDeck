// HomeDeck contains the top project cards in each category
import React, { useState, useEffect, useContext } from "react"; //import React Component
import { Card } from './Card.js';
import { CredentialsContext } from '../App.js';
import { PostService } from '../services/PostService.js';
import { toast } from 'react-toastify';

function HomeDeck(props) {
    const { credentials } = useContext(CredentialsContext);
    const [featuredPosts, setFeaturedPosts] = useState(null);
    const [popularPosts, setPopularPosts] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [refreshImageToggle, setRefreshImageToggleCallback] = useState(true);

    const max_posts_to_display = 6;

    // Card Factory Handler
    const createTopCards = function (data) {
        return data.map((postCard, i) => <Card 
                                            key={i} 
                                            cardData={postCard}
                                            setLoadingCallback={setLoading}
                                            isLoading={isLoading}
                                            refreshImageToggle={refreshImageToggle}
                                            setRefreshImageToggleCallback={setRefreshImageToggleCallback}
                                        />)
    };

    useEffect(() => {
        if (isLoading) {
            PostService.findAllPosts()
                .then(allPosts => {
                    
                    const popular = allPosts.sort((post_a, post_b) => post_b.likes.length - post_a.likes.length).slice(0, max_posts_to_display);
                    const recent = allPosts.sort((post_a, post_b) => new Date(post_b.created_date).getTime() - new Date(post_a.created_date).getTime()).slice(0, max_posts_to_display);
                    // Random
                    var randomPosts = [];

                    var holder = [];

                    while (randomPosts.length !== max_posts_to_display) {
                        const index = Math.floor(Math.random() * allPosts.length);

                        if (!holder.includes(index)) {
                            randomPosts.push(allPosts[index]);
                            holder.push(index);
                        }
                    }
                    setFeaturedPosts(createTopCards(randomPosts));
                    setPopularPosts(createTopCards(popular));
                    setRecentPosts(createTopCards(recent));
                    setRefreshImageToggleCallback(false);
                    setLoading(false);  // <-- Remember to change loading to no load no more!
                })
                .catch(err => {
                    toast.error(err + '');
                });
        }
    }, [isLoading, credentials, refreshImageToggle])

    return (
        <div>
            <hr style={{height: '0'}}/>
            <div>
                <h2>♠ Popular projects ♠</h2>
                <div className="row">
                    {popularPosts}
                </div>
            </div>
            <hr />
            <hr style={{height: '0'}}/>
            <div>
                <h2>♠ Recently added projects ♠</h2>
                <div className="row">
                    {recentPosts}
                </div>
            </div>
        </div>
    )
}

export default HomeDeck;
