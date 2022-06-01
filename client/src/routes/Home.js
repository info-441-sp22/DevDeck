import React, { useState } from "react"; //import React Component
import { Button } from "reactstrap";
import { Card } from "../components/Card.js";
import { LoginService } from "../services/LoginService.js";

export default function HomePage() {
    
    return (
        <main>
            <div className="home container-fluid">
                <div className="row welcome">
                    <div className="row">
                        {/* <!--"Blurb Box" Start--> */}
                        <div className="blurb-box bg-blurb p-3 m-sm-3 mb-sm-4" aria-label="person with laptop" style={{
                            backgroundImage: `url("imgs/blurb_background3.jpg")`
                        }}>
                            {/* position-relative text-left  */}
                            <div className="blurb-text pl-lg-4 mb-0 my-4">
                                <h1 className="font-weight-bold">Welcome to DevDeck!</h1>
                                <p className="font-weight-normal ">We are a platform for developers to share their projects with the world.
                                    We enable our users to attract collaborators and potential sponsors through their project posts.
                                    Every day, a new development project is created and does not get the exposure it deserves. </p>
                                <p><em>So play your cards right with DevDeck, and show the world your winning hand.</em></p>
                            </div>
                        </div>
                        {/* <!--"Blurb Box" End--> */}
                    </div>
                    <div className="col">
                        <div className="featured-project">
                            <h2>Featured projects:</h2>
                            <div className="row">
                                <Card />
                                <Card />
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recently-added">
                    <h2>Recently added projects:</h2>
                    <div className="row">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>

                <div className="popular">
                    <h2>Popular projects:</h2>
                    <div className="row">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </main>
    )
}