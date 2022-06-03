import React, { createRef, useEffect, useState } from "react"; 
import { Button } from "reactstrap";
import CreateProjectModal from "../components/CreateProjectModal";
import UserDeck from "../components/UserDeck";
import { LoginService } from "../services/LoginService.js";
import { ProfileService } from "../services/ProfileService.js";
import { useLocation, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.js";
import { ImageService } from "../services/ImageService.js";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const { username } = useParams();
    const [searchParams] = useSearchParams();
    const { setLoggedIn, credentials } = useOutletContext();
    const [profileInfo, setProfileInfo] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isClientUser, setIsClientUser] = useState(false);


    // Editing permission handlers
    const checkClientUser = () => credentials && credentials.username === username;
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
        // Check to see if it is the client viewing their page
        setIsClientUser(checkClientUser());
        // Load the profile data
        if (isLoading) {
            ProfileService.getProfile(username)
                .then((payload) => {
                    setProfileInfo(payload.user_info);
                    setProfileImage(payload.profile_img);
                    setLoading(false);
                })
                .catch(err => { 
                    toast.error(err + '');
                });
        }
    }, [isLoading, credentials]);    // change `isLoading` to refresh the data loading

    async function updateUserBio(e) {
        // e.preventDefault();
        let bio = document.getElementById(`userBio`).value;
        await ProfileService.putProfileBio(LoginService.getUserCredentials().username, bio)
        setLoading(true); // Just need to refresh page
    }

    async function updateUserLinks(e) {
        // e.preventDefault();
        let name = document.getElementById(`LinkName`).value;
        let url = document.getElementById(`LinkURL`).value;
        await ProfileService.putProfileLinks(LoginService.getUserCredentials().username, name, url)
        setLoading(true); // Just need to refresh page
    }

    async function updateUserSkills(e) {
        // e.preventDefault();
        let skill = document.getElementById(`userSkill`).value;
        await ProfileService.putProfileSkills(LoginService.getUserCredentials().username, skill)
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
                        <div className="profile-img card bg-custom" style={{backgroundColor: '#808080'}}>
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
                                    ? <div style={{alignSelf: 'center'}}>
                                        <input
                                            type="file"
                                            id="profile_img_upload"
                                            name="profile_img"
                                            accept="image/*"
                                            onChange={uploadImageHandler}
                                        />
                                        <Button
                                            type="button"
                                            color="dark"
                                            onClick={() => onClickImageSubmitHandler()}>
                                            Change Image
                                        </Button>
                                    </div>
                                    : <></>
                            }
                            <h2 className="profile-text">{profileInfo.first_name + ' ' + profileInfo.last_name}</h2>
                            <h3 className="profile-text" style={{opacity: '0.8'}}>@{profileInfo.username}</h3>
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
                                            placeholder="A little bit about you..."
                                        />
                                        <Button color="dark" size="sm" onClick={() => {updateUserBio()}}>Update bio</Button>
                                    </div>
                                    : <></>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="links">
                            <h2>Links:</h2>
                            <ul>
                                {
                                    profileInfo.urls.map((url, i) => {
                                        const tokens = url.split('+');
                                        return <li key={i}><a style={{color: "#BA1800"}} href={tokens[1]}>{tokens[0]}</a></li>
                                    })
                                }
                            </ul>
                            {
                                (isClientUser)
                                    ?  <div>
                                        <input
                                            type="text"
                                            id="LinkName"
                                            name="LinkName"
                                            placeholder="Website name"
                                        />
                                        <input
                                            type="text"
                                            id="LinkURL"
                                            name="LinkURL"
                                            placeholder="Website link"
                                        />
                                        <Button color="dark" size="sm" onClick={() => {updateUserLinks()}}>Add link</Button>
                                    </div>
                                    : <></>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="skills">
                            <h2>Skills:</h2>
                            <ul>
                                {
                                    profileInfo.skillset.map((skill, i) => {
                                        return <li key={i}>{skill}</li>;
                                    })
                                }
                            </ul>
                            {
                                (isClientUser)
                                    ?  <div>
                                        <input
                                            type="text"
                                            id="userSkill"
                                            name="userSkill"
                                            placeholder="Skill name"
                                        />
                                        <Button color="dark" size="sm" onClick={() => {updateUserSkills()}}>Add skill</Button>
                                    </div>
                                    : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{height: '0'}}/>
            <div className="projects container-fluid">
                <UserDeck
                    isClientUser={isClientUser}
                    username={username}
                />
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