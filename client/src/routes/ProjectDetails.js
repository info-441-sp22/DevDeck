import React, { useEffect, useState } from "react"; //import React Component
import { useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import LoadingComponent from "../components/LoadingComponent";
import { LoginService } from "../services/LoginService";
import { PostService } from "../services/PostService";
import { useNavigate } from "react-router-dom";
import { ImageService } from "../services/ImageService";
import { CommentService } from "../services/CommentService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function ProjectDetails() {
    const { id } = useParams();
    const { setLoggedIn, credentials } = useOutletContext();
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState();
    const [commentData, setCommentData] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            // Get the post info
            PostService.findSinglePost({ id: id })
                .then(data => {
                    setPostData(data);

                    // Get the post image
                    ImageService.getPostImage({ post_id: id })
                        .then(url => {
                            setImageUrl(url);
                        })
                })
                .catch(err => toast.error(err));

            // Get the post comments
            CommentService.getComments(id)
                .then(data => {
                    console.log("comment data:", data)
                    setCommentData(data);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err + '')
                });    
        }
    }, [isLoading]);

    const goToUrl = () => { // function to lead to project url
        window.open(postData.url_link, '_blank');
    }

    const returnHome = () => {
        navigate('/home/');
    }

    async function refreshComments() {
        // e.preventDefault();
        await CommentService.getComments(postData._id)
        setLoading(true); // Just need to refresh page
    }

    async function postComment() {
        // e.preventDefault();
        let comment = document.getElementById(`new-comment-${postData._id}`).value;
        console.log(credentials)
        await CommentService.postComment(postData._id, comment, credentials.username)
        setLoading(true); // Just need to refresh page
    }
    
    const viewUser = () => {
        navigate('/profile/' + postData.username);
    }

    // const displayCollab = () => { // function to display project collaborators
    //     let collabs = postData.collaborators;
    //     let toReturn = collabs.forEach(collab => {
    //         console.log(collab)
    //         return <div>{collab}</div>
    //     })
    //     return toReturn;
    // }

    return (
        <>
        {
            (!postData)
                ? <LoadingComponent />
                : <main>
                    <div className="project container-fluid">
                        <div classname="row">
                            <div className="col">
                                <h2>{
                                    postData.title + " "
                                } 
                                <Button color="danger" onClick={goToUrl}>
                                    Link to project
                                </Button></h2>
                            </div>
                            <h5>Posted by: <a href="" style={{color: "#BA1800"}} onClick={viewUser}>{postData.username}</a></h5>
                            <h5><em>{
                                postData.blurb
                            }</em></h5>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">
                                <div>
                                    <img className="thumbnail" src={imageUrl} onClick={goToUrl} alt="project thumbnail"></img>
                                </div>                                
                            </div>
                            <div className="col">
                                <div className="techStack">
                                    <h3>Tech stack:</h3>
                                    {
                                        postData.techStack
                                    }
                                    <ul>
                                    {
                                        postData.techStack.map((tech) => {
                                            const tokens = tech.split(', ');
                                            tokens.forEach((token, i) => {
                                                return <li key={i}>{token}</li>;
                                            })                                            
                                        })
                                    }
                                    </ul>
                                </div>
                            </div>
                            <div className="col">                        
                                <div className="collaborators">
                                    <h3>Collaborators:</h3>
                                    {/* {displayCollab} */}
                                    {postData.collaborators}
                                </div>
                            </div>
                            <div className="col">
                                <h3>Likes info:</h3>
                                <p>{postData.likes.length} likes</p>
                                {
                                    postData.likes.map((user, i) => {
                                        return <span key={i}>
                                                <p><FontAwesomeIcon icon={faHeart} /> - {user}</p>
                                            </span>;
                                    })
                                }
                            </div>
                        </div>
                        <hr style={{height: '0'}} />
                        <div className="row">
                            <div className="col">
                                <h3>Description:</h3>
                                {
                                    postData.longer_description
                                }
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col" style={{flexBasis: '50%'}}>
                                        <h5>Comments:</h5>
                                    </div>
                                    <div className="col" style={{flexBasis: '50%'}}>
                                        <Button onClick={refreshComments}>
                                            Refresh comments
                                        </Button>
                                    </div>
                                </div>
                                <div className="post-interactions">
                                    <div id={`comments-box-${postData._id}`} className="comments-box">
                                        <div id={`comments-${postData._id}`}>
                                        {
                                            commentData.map((comment, i) => {
                                                return <div style={{border: "1px solid black", padding: "5px"}} key={i}>
                                                    <h4>{comment.comment}</h4>
                                                    <h5><i>{comment.username}</i></h5>
                                                    <p><i>{Date(comment.created_date)}</i></p>
                                                </div>
                                                // @TODO fix the styling
                                            })
                                        }
                                        </div>
                                        <div className={`new-comment-box ${true ? '': 'd-none'}`}>
                                            New Comment:
                                            <input type="text" id={`new-comment-${postData._id}`} style={{color: 'black'}}/>
                                            <Button onClick={postComment}>
                                                Post comment
                                            </Button>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                        <br></br>
                        <Button className="btn btn-primary" onClick={returnHome}>Return to homepage</Button>
                        {/* <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br> */}
                        <hr style={{height: '0'}}/>
                    </div>
                </main>
        }
        </>
    )
}