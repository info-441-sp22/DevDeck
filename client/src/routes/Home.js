import React, { useState } from "react"; //import React Component
import { Button } from "reactstrap";
import { Card } from "../components/card.js";

export default function HomePage() {
    return (
        <main>
            <div className="home container-fluid">
                <div className="row welcome">
                    <div className="row">
                        {/* <!--"Blurb Box" Start--> */}
                        <div className="blurb-box bg-blurb p-3 m-sm-3 mb-sm-4" aria-label="person with laptop" style={{
                            backgroundImage: `url("imgs/blurb_background2.jpg")`
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
                    <div class="col">
                        <div className="featured-project">
                            {/* featured prokect card here */}
                            <h2>Featured project title:</h2>
                            <h5>This is a great project so it is featured.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.</h5>
                        </div>
                    </div>
                </div>

                <div className="recently-added">
                    <h2>Recently added projects:</h2>
                    <div class="row">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>

                <div className="popular">
                    <h2>Popular projects:</h2>
                    <div class="row">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </main>
    )
}