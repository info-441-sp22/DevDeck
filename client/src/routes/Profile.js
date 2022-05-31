import React, { useEffect, useState } from "react"; //import React Component
import { Card } from "../components/card.js";
import { Button } from "reactstrap";
import CreateProjectModal from "../components/CreateProjectModal";
import { LoginService } from "../services/LoginService.js";

export default function ProfilePage() {
    const [val, setVal] = useState("");
    const [userInfo, setUserInfo] = useState(LoginService.getUserCredentials());

    useEffect(() => {
        console.log(userInfo);
    })

    return (
        <main>
            <div className="profile container-fluid">
                <div className="row">
                    <div class="col">
                        <div className="profile-img">
                            <h2>Kyle Thayer</h2>
                            <h3>@kyle_slayer</h3>
                        </div>
                    </div>
                    <div class="col">
                        <div className="bio">
                            <h2>Bio:</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                    </div>
                    <div class="col">
                        <div className="skills">
                            <ul>
                                <li>Node.js</li>
                                <li>R</li>
                                <li>Python</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div className="links">
                            <ul>
                                <li>GitHub</li>
                                <li>LinkedIn</li>
                                <li>Personal</li>
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
    )
}