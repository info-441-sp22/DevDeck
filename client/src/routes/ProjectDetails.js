import React, { useEffect, useState } from "react"; //import React Component
import { useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import LoadingComponent from "../components/LoadingComponent";
import { LoginService } from "../services/LoginService";
import { PostService } from "../services/PostService";

export default function ProjectDetails() {
    const { id } = useParams();
    const { setLoggedIn, credentials } = useOutletContext();
    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState();

    useEffect(() => {
        if (isLoading) {
            LoginService.authenticationHeartbeat(setLoggedIn);
            PostService.findSinglePost({ id: id })
                .then(data => {
                    setPostData(data);
                    setLoading(false);
                })
                .catch(err => toast.error(err));
        }
    }, [isLoading]);

    return (
        <>
        {
            (!postData)
                ? <LoadingComponent />
                : <main>
                    <div className="project container-fluid">
                        {
                            postData.title
                        }
                        <Button className="btn btn-primary" onClick={() => console.log("Link")}>
                            Link to project
                        </Button>
                        <div className="row">
                            <div className="col">
                                <div className="thumbnail">
                                    <img src="imgs/thumbnail_default.png" alt="project thumbnail"></img>
                                </div>
                            </div>
                            <div className="col">
                                <div className="blurb">
                                    <em>{
                                        postData.blurb
                                    }</em>
                                </div>
                            </div>
                            <div className="col">                        
                                <div className="collaborators">
                                    <h2>Collaborators:</h2>
                                    {postData.collaborators}
                                </div>
                                {/* figure out likes & comments */}
                                <h5><em>Likes and comments info</em></h5> 
                            </div>
                            <div>
                                <h2>Description:</h2>
                                {
                                    postData.longer_description
                                }
                            </div>
                        </div>
                    </div>
                </main>
        }
        </>
    )
}