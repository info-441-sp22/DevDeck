import React, { useEffect, useState } from "react"; //import React Component
import { Card } from "../components/Card.js";
import { Button } from "reactstrap";
import CreateProjectModal from "../components/CreateProjectModal";
import UserDeck from "../components/UserDeck";
import { LoginService } from "../services/LoginService.js";
import { ProfileService } from "../services/ProfileService.js";
import { useLocation, useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.js";
import { ImageService } from "../services/ImageService.js";
import { fetchJSON } from "../utils/utils.js";

export default function ProfilePage(props) {
    const { username } = useParams();
    const isClientUser = LoginService.getUserCredentials().username === username;
    const [val, setVal] = useState("");
    const [profileInfo, setProfileInfo] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Grab URL query param
    const uploadImageHandler = (event) => {
        const imageData = new FormData();
        imageData.append('image', event.target.files[0]);
        // const request = {
        //     username: LoginService.getUserCredentials().username,
        //     image_type: 'profile_image',
        //     data: imageData
        // }
        // console.log(event.target.files[0]);
        ImageService.uploadImage(imageData);
    }

    useEffect(() => {
        if (isClientUser) console.log('This is the client user page.');
        // Load the profile data
        if (isLoading) {
            ProfileService.getProfile(username)
                .then((data) => {
                    setProfileInfo(data);
                    setLoading(false);
                })
                .catch(err => {  // Handle error page
                    console.log(err);
                });
        }
    }, [isLoading]);    // change `isLoading` to refresh the data loading

    async function updateUserInfo(e) {
        // e.preventDefault();
        let bio = document.getElementById(`userBio`).value;
        ProfileService.putProfile(username, bio)
        setLoading(true); // Just need to refresh page
      }

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
                                (isClientUser)
                                    ? <input
                                    type="file"
                                    id="profile_img_upload"
                                    name="profile_img"
                                    accept="image/*"
                                    onChange={uploadImageHandler}
                                />
                                    : <></>
                            }
                            <h2>{profileInfo.first_name + ' ' + profileInfo.last_name}</h2>
                            <h3>@{profileInfo.username}</h3>
                        </div>
                    </div>
                    <div className="col">
                        <div className="bio">
                            <h2>Bio:</h2>
                            <p>{profileInfo.bio}</p>
                            {
                                (isClientUser)
                                    ?  <div>
                                        <input
                                            type="text"
                                            id="userBio"
                                            name="userBio"
                                        />
                                        <Button size="sm" onClick={() => {updateUserInfo()}}>Update bio</Button>
                                    </div>
                                    : <></>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="skills">
                            <ul>
                                {
                                    profileInfo.urls.map((url) => {
                                        const tokens = url.split(':');
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
                <CreateProjectModal>
                </CreateProjectModal>
                <span id="postStatus"></span>
                <UserDeck 
                    username={username}>
                </UserDeck>
            </div>

            {/* <div className="projects container-fluid">
                <div className="row">
                    <Card />
                    <Card />
                </div>
            </div> */}
        </main>
    }
    </div>)
}