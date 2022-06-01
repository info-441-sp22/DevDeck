import React, { useState } from "react"; //import React Component
import { Button } from "reactstrap";

export default function ProjectDetails() {
    return (
        <main>
            <div className="project container-fluid">
                <h1>Project Title</h1>
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
                            <h2>Blurb:</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                    </div>
                    <div className="col">                        
                        <div className="collaborators">
                            <h2>Collaborators:</h2>
                            <p>Link to collaborators' profiles</p>
                        </div>
                        {/* figure out likes & comments */}
                        <h5><em>Likes and comments info</em></h5> 
                    </div>

                    <h2>Inspiration</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h2>What it does</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h2>How I built it</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h2>Challenges I ran into</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h2>Accomplishments I'm proud of</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h2>What I learned</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h2>What's next</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                </div>
            </div>
        </main>


        // <div>
        //     <h1>Project Title</h1>
        //     <div className="thumbnail">
        //         <img src="imgs/thumbnail_default.png" alt="project thumbnail"></img>
        //     </div>
        //     <p>Blurb</p>
        // </div>
    )
}