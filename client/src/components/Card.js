import React, { useState, useEffect, useContext } from "react"; //import React Component
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { fetchJSON, escapeHTML } from './../utils/utils.js'
import { PostService } from '../services/PostService.js';
import { toast } from "react-toastify";
import { ImageService } from "../services/ImageService.js";
import { CredentialsContext } from "../App.js";

export function Card(props) {
    // const cardData = props.cardData
    const setLoadingCallback = props.setLoadingCallback;
    const setRefreshImageToggleCallback = props.setRefreshImageToggleCallback;
    const refreshImageToggle = props.refreshImageToggle;
    const cardData = props.cardData;
    const id = props.id;
    const { credentials } = useContext(CredentialsContext);
    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate();

    // like handlers
    const likePost = async (postID, username) => {
        // Await login process
        PostService.likePost(postID, username)
            .then(() => {
                setLoadingCallback(true);
                setRefreshImageToggleCallback(!refreshImageToggle);
            })
            .catch((err) => toast.error(err + ''));
    
    }
    const unlikePost = async (postID, username) => {
        // Await login process
        PostService.unlikePost(postID, username)
            .then(() => {
                setLoadingCallback(true);
                setRefreshImageToggleCallback(!refreshImageToggle);
            })
            .catch((err) => toast.error(err + ''));
    }

    const onClickView = () => {
        navigate('/project/' + cardData.id);
    }

    const viewUser = () => {
        navigate('/profile/' + cardData.username);
    }

    useEffect(() => {
        ImageService.getPostImage({ post_id: cardData.id })
            .then((url) => {
                setImageUrl(url);
            })
            .catch((err) => toast.error(err + ''));
    }, [refreshImageToggle]);

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
                            <p className="card-text">Posted by: <a href="" style={{color: "#d33115"}} onClick={viewUser}>{cardData.username}</a></p>
                            <p className="card-text">{cardData.blurb}</p>
                            <div className="row">
                                {/* like and unlike button */}
                                <div style={{flexBasis: '50%'}}>
                                    <span title={(cardData.likes) ? escapeHTML(cardData.likes.join(", ")) : ""}> {cardData.likes ? (cardData.likes.length) : 0} likes </span> &nbsp; &nbsp;
                                    <span className={`heart-button-span ${credentials ? "" : "d-none"}`}>
                                        {credentials && cardData.likes && cardData.likes.includes(credentials.username) ?
                                            <button className="heart_button" onClick={() => {
                                                unlikePost(cardData.id, credentials.username); 
                                            }}> &#x2665;</button> :
                                            <button className="heart_button" onClick={() => {
                                                likePost(cardData.id, credentials.username); 
                                            }}> &#x2661;</button>}
                                    </span>
                                </div>
                                <Button color="dark" onClick={onClickView} style={{flexBasis: '50%'}}>
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