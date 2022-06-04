import React, { useContext, useState } from "react"; //import React Component
import { CredentialsContext } from "../App.js";
import HomeDeck from "../components/HomeDeck.js";

export default function HomePage() {
    const { credentials } = useContext(CredentialsContext);

    return (
        <main>
            <div className="home container-fluid">
                <div className="row welcome">
                    <div className="row">
                        <div className="blurb-box bg-blurb p-3 m-sm-3 mb-sm-4" aria-label="person with laptop" style={{
                            backgroundImage: `url("../imgs/blurb_background3.jpg")`
                        }}>
                            <div className="blurb-text pl-lg-4 mb-0 my-4">
                                <h1 className="font-weight-bold">Welcome to DevDeck!</h1>
                                <p className="font-weight-normal ">We are a platform for developers to share their projects with the world.
                                    We enable our users to attract collaborators and potential sponsors through their project posts.
                                    Every day, new development projects are created and do not get the exposure they deserve. </p>
                                <p><em>♠ So play your cards right with DevDeck, and show the world your winning hand. ♠</em></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <HomeDeck credentials={credentials} />
                
            </div>
        </main>
    )
}