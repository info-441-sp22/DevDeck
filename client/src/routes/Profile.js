import React, { useEffect, useState } from "react"; //import React Component
import { Card } from "../components/card.js";
import { Button } from "reactstrap";
import CreateProjectModal from "../components/CreateProjectModal";
import { LoginService } from "../services/LoginService.js";
import { ProfileService } from "../services/ProfileService.js";
import { useLocation, useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.js";

export default function ProfilePage(props) {
    const { username } = useParams();
    const isClientUser = LoginService.getUserCredentials().username === username;
    const [val, setVal] = useState("");
    const [profileInfo, setProfileInfo] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Grab URL query param

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

    return (
    <div>
    {
        (isLoading)
            ? <LoadingComponent />
            :   <main>
            <div className="profile container-fluid">
                <div className="row">
                    <div class="col">
                        <div className="profile-img">
                            <h2>{profileInfo.first_name + ' ' + profileInfo.last_name}</h2>
                            <h3>@{profileInfo.username}</h3>
                        </div>
                    </div>
                    <div class="col">
                        <div className="bio">
                            <h2>Bio:</h2>
                            <p>{profileInfo.bio}</p>
                        </div>
                    </div>
                    <div class="col">
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
                    <div class="col">
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