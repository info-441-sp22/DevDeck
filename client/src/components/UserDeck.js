import React, { useState, useEffect } from "react"; //import React Component
import { Card } from "./Card.js";
import { BASEPOINT } from "../App";
import { PostService } from "../services/PostService.js";
import CreateProjectModal from "./CreateProjectModal.js";
import { ImageService } from "../services/ImageService.js";

function UserDeck(props) {
    const isClientUser = props.isClientUser;
    const username = props.username ? props.username : "";
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setLoading] = useState(true); // <-- I want to load!

    useEffect(() => {
        if (isLoading) {    // <-- load when I want u to load
            // Build request object
            const request = {
                username: username
            };
    
            PostService.findPosts(request)
                .then(data => {
                    setUserPosts(data.map((postCard, i) => {
                        console.log(postCard);

                        return <Card 
                            key={i} 
                            cardData={postCard} 
                            username={username} 
                            setLoadingCallback={setLoading}
                        />}));
                    setLoading(false);  // <-- Remember to change loading to no load no more!
                });
        }
    }, [isLoading]) // <-- runs every time isLoading changes

    return (
        <>
            <div>
                {
                    (isClientUser)
                        ? <div><h2>Your Deck:</h2>
                        <CreateProjectModal
                            setLoadingCallback={setLoading}
                        />
                        </div>
                        : <div><h2>DevDeck:</h2></div>
                }

            </div>
            <div className="home container-fluid">
                <div className="row">
                    {userPosts}
                </div>
            </div>
        </>
    )
}

export default UserDeck;