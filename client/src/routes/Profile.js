import React, { useEffect, useState } from "react"; //import React Component
import { Card } from "../components/card.js";
import { Button } from "reactstrap";
import CreateProjectModal from "../components/CreateProjectModal";
import { LoginService } from "../services/LoginService.js";
import { ProfileService } from "../services/ProfileService.js";
import { useLocation, useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.js";
import { ImageService } from "../services/ImageService.js";

export default function ProfilePage(props) {
    const { username } = useParams();
    const isClientUser = LoginService.getUserCredentials().username === username;
    const [val, setVal] = useState("");
    const [profileInfo, setProfileInfo] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Grab URL query param
    const uploadImageHandler = (event) => {
        const request = new FormData();
        request.append('file', event.target.files[0]);
        ImageService.uploadProfileImage(request);
    }

    useEffect(() => {
        // Load the profile data
        if (isLoading) {
            ProfileService.getProfile(username)
                .then((payload) => {
                    console.log(payload);
                    setProfileInfo(payload.user_info);
                    // setProfileImage(payload.profile_img);
                    setLoading(false);
                })
                .catch(err => {  // Handle error page
                    console.log(err);
                });
        }
    }, [isLoading]);    // change `isLoading` to refresh the data loading

    return (
    <div>
    {
        (isLoading)
            ? <LoadingComponent />
            :   <main>
            <div className="profile container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="profile-img">
                            {
                                (profileImage)
                                    ? <img src={profileImage} />
                                    : <></>
                            }
                            <input
                                type="file"
                                id="profile_img_upload"
                                name="profile_img"
                                accept="image/*"
                                onChange={uploadImageHandler}
                            />
                            <h2>{profileInfo.first_name + ' ' + profileInfo.last_name}</h2>
                            <h3>@{profileInfo.username}</h3>
                        </div>
                    </div>
                    <div className="col">
                        <div className="bio">
                            <h2>Bio:</h2>
                            <p>{profileInfo.bio}</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="skills">
                            <ul>
                                {
                                    profileInfo.urls.map((url) => {
                                        const tokens = url.split('+');
                                        return <li><a href={tokens[1]}>{tokens[0]}</a></li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="links">
                            <ul>
                                {
                                    profileInfo.skillset.map((skill) => {
                                        return <li>{skill}</li>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="projects container-fluid">
                <h2>Your Deck:</h2>
                {/* <Button className="btn btn-secondary">Add project</Button> */}
                <CreateProjectModal>
                    val={val}
                    setVal={setVal}
                </CreateProjectModal>
                <span id="postStatus"></span>
            </div>

            <div className="projects container-fluid">
                <div className="row">
                    <Card />
                    <Card />
                </div>
            </div>
        </main>
    }
    </div>)
}