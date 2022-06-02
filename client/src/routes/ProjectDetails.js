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
            LoginService.authenticationHeartbeat(setLoggedIn);
            PostService.findSinglePost({ id: id })
                .then(data => {
                    setPostData(data);
                    console.log(id);
                    ImageService.getPostImage({ post_id: id })
                        .then(url => {
                            setImageUrl(url);
                        })
                })
                .catch(err => toast.error(err));
            CommentService.getComments(id)
                .then(data => {
                    console.log("comment data:", data)
                    setCommentData(data);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err)
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
        console.log(comment)
        console.log(LoginService)
        console.log(LoginService.getUserCredentials())
        let username = LoginService.getUserCredentials().username;
        await CommentService.postComment(postData._id, comment, username)
        setLoading(true); // Just need to refresh page
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
                        <h2>{
                            postData.title
                        }</h2>
                        {/* <a href="">Link to project</a> */}
                        <Button color="primary" onClick={goToUrl}>
                            Link to project
                        </Button>
                        <div className="row">
                            <div className="col">
                                <div>
                                    <img className="thumbnail" src={imageUrl} alt="project thumbnail"></img>
                                </div>
                            </div>
                            <div className="col">
                                <div className="blurb">
                                    <h3>Short blurb:</h3>
                                    <em>{
                                        postData.blurb
                                    }</em>
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
                                            tokens.forEach((token) => {
                                                return <li>{token}</li>;
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
                                            commentData.map((comment) => {
                                                return <li>${comment}</li>
                                            })
                                        }
                                        </div>
                                        <div className={`new-comment-box ${true ? '': 'd-none'}`}>
                                            New Comment:
                                            <input type="text" id={`new-comment-${postData._id}`} style={{color: 'black'}}/>
                                            <Button onClick={() => postComment(postData._id)}>
                                                Post comment
                                            </Button>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                        <br></br>
                        <Button className="btn btn-primary" onClick={returnHome}>Return to homepage</Button>
                    </div>
                </main>
        }
        </>
    )
}