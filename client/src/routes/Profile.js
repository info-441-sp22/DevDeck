import React, { useState } from "react"; //import React Component
import { Button } from "reactstrap";

export default function ProfilePage() {
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
            <div className="card-container">
                <div className="card" style={{width: '18em'}}>
                <img className="card-img-top" src="..." alt="Project thumbnail"></img>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Project description... lorem ipsum et cetera</p>
                    <Button className="btn btn-primary" onClick={() => console.log("Link")}>
                        Link to project?
                    </Button>
                </div>
                </div>
            </div>
        </main>
    )
}