import React, { useEffect, useState } from "react"; //import React Component
import { useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import LoadingComponent from "../components/LoadingComponent";
import { LoginService } from "../services/LoginService";
import { PostService } from "../services/PostService";
import { useNavigate } from "react-router-dom";
import { ImageService } from "../services/ImageService";

export default function ProjectDetails() {
    const { id } = useParams();
    const { setLoggedIn, credentials } = useOutletContext();
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState();
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
                            setLoading(false);
                        })
                })
                .catch(err => toast.error(err));
        }
    }, [isLoading]);

    const goToUrl = () => { // function to lead to project url
        window.open(postData.url_link, '_blank');
    }

    const returnHome = () => {
        navigate('/home/');
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
                        <h2>{
                            postData.title
                        }</h2>
                        <h5>Posted by: <a href="" onClick={viewUser}>{postData.username}</a></h5>
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
                                <br></br>
                                {/* figure out likes & comments */}
                                {/* <h5><em>Likes and comments info</em></h5>  */}
                            </div>
                            <div>
                                <h3>Description:</h3>
                                {
                                    postData.longer_description
                                }
                            </div>                            
                        </div>
                        <hr style={{height: '0'}}/>
                        <br></br>
                        <Button className="btn btn-primary" onClick={returnHome}>Return to homepage</Button>
                    </div>
                </main>
        }
        </>
    )
}