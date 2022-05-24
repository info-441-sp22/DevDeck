import React, { useState } from "react"; //import React Component
import { Button } from "reactstrap";

export default function HomePage() {
    return (
        <main>
            <div className="home container-fluid">
                <div className="row welcome">
                    <div class="col">
                        <div className="welcome-text">
                            <h1>Welcome to DevDeck</h1>
                            <h4>DevDeck is good, here are some introductions of devdeck.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.</h4>
                        </div>
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

                <div className="row recently-added">
                    <h2>Recently added projects:</h2>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                </div>


                <div className="row popular">
                    <h2>Popular projects:</h2>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                    <div class="col">
                        <div className="card-container">
                            <div className="card" style={{ width: '18em' }}>
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
                    </div>
                </div>
            </div>



        </main>
    )
}