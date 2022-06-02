import React, { useState, useEffect } from "react"; //import React Component
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { fetchJSON, escapeHTML } from './../utils/utils.js'
import { PostService } from '../services/PostService.js';
import { toast } from "react-toastify";
import { ImageService } from "../services/ImageService.js";

export function Card(props) {
    // const cardData = props.cardData
    const setLoadingCallback = props.setLoadingCallback;
    const cardData = props.cardData;
    const id = props.id;
    const currUsername = props.username;
    const [val, setVal] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate();

    // like handlers
    const likePost = async (postID, username) => {
        // Await login process
        PostService.likePost(postID, username)
            .then(() => {
                setLoadingCallback(true);
            });
    
    }
    const unlikePost = async (postID, username) => {
        // Await login process
        PostService.unlikePost(postID, username)
            .then(() => {
                setLoadingCallback(true);
            });
    }

    const onClickView = () => {
        navigate('/project/' + cardData.id);
    }

    const viewUser = () => {
        navigate('/profile/' + cardData.username);
    }

    useEffect(() => {
        ImageService.getPostImage({ post_id: cardData.id })
            .then((url) => setImageUrl(url));
    }, []);

    return (
        <>
            {
                (!cardData)
                    ? <div className="card bg-custom" style={{ width: '18em', margin: '2rem' }}>
                    </div>
                    : <div className="card bg-custom" style={{ width: '18em', margin: '2rem' }}>
                        <img className="card-img-top" src={imageUrl} alt="Project thumbnail"></img>
                        <div className="card-body">
                            <h5 className="card-title">{cardData.title}</h5>
                            <p className="card-text">Posted by: <a href="" onClick={viewUser}>{cardData.username}</a></p>
                            <p className="card-text">{cardData.blurb}</p>
                            <div className="row">
                                {/* like and unlike button */}
                                <div style={{flexBasis: '50%'}}>
                                    <span title={(cardData.likes) ? escapeHTML(cardData.likes.join(", ")) : ""}> {cardData.likes ? (cardData.likes.length) : 0} likes </span> &nbsp; &nbsp;
                                    <span className={`heart-button-span ${currUsername ? "" : "d-none"}`}>
                                        {cardData.likes && cardData.likes.includes(currUsername) ?
                                            <button className="heart_button" onClick={() => {
                                                unlikePost(cardData.id, currUsername); 
                                            }}> &#x2665;</button> :
                                            <button className="heart_button" onClick={() => {
                                                likePost(cardData.id, currUsername); 
                                            }}> &#x2661;</button>}
                                    </span>
                                </div>
                                <Button className="btn btn-primary" onClick={onClickView} style={{flexBasis: '50%'}}>
                                    View details
                                </Button>
                            </div>
                            {/* need to create new page for each card's project details */}
                        </div>
                    </div>
            }
        </>
    )
}