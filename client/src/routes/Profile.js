import React, { createRef, useEffect, useState } from "react"; 
import { Button } from "reactstrap";
import CreateProjectModal from "../components/CreateProjectModal";
import UserDeck from "../components/UserDeck";
import { LoginService } from "../services/LoginService.js";
import { ProfileService } from "../services/ProfileService.js";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.js";
import { ImageService } from "../services/ImageService.js";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const { username } = useParams();
    const { setLoggedIn, credentials } = useOutletContext();
    const [profileInfo, setProfileInfo] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isClientUser, setIsClientUser] = useState(false);

    // Editing permission handlers
    const checkClientUser = () => {
        console.log('credentials', credentials);
        return credentials && credentials.username === username;
    }
    // Image Handlers
    const uploadImageHandler = async (event) => {
        const request = new FormData();
        request.append('file', event.target.files[0]);
        await ImageService.uploadProfileImage(request);
        toast.info('Profile image uploaded.');
        setLoading(true);
    }

    const onClickImageSubmitHandler = async () => {
        document.getElementById('profile_img_upload').click();
    }

    useEffect(() => {
        // Load the profile data
        if (isLoading) {
            LoginService.authenticationHeartbeat(setLoggedIn);
            ProfileService.getProfile(username)
                .then((payload) => {
                    setProfileInfo(payload.user_info);
                    setProfileImage(payload.profile_img);
                    // Check to see if it is the client viewing their page
                    setIsClientUser(checkClientUser());
                    setLoading(false);
                })
                .catch(err => {  // Handle error page
                    console.log(err);
                });
        }
    }, [isLoading, credentials]);    // change `isLoading` to refresh the data loading

    async function updateUserInfo(e) {
        // e.preventDefault();
        let bio = document.getElementById(`userBio`).value;
        await ProfileService.putProfile(LoginService.getUserCredentials().username, bio)
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
                                (profileImage)
                                    ? <img 
                                        src={profileImage} 
                                        alt="Profile" 
                                        className="nav-profile-pic"
                                    />
                                    : <></>
                            }
                            {
                                (isClientUser)
                                    ? <div>
                                        <input
                                            type="file"
                                            id="profile_img_upload"
                                            name="profile_img"
                                            accept="image/*"
                                            onChange={uploadImageHandler}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => onClickImageSubmitHandler()}>
                                            Change Image
                                        </Button>
                                    </div>
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
                <CreateProjectModal>
                </CreateProjectModal>
                {/* <span id="postStatus"></span> */}
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