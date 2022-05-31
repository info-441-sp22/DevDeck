// UserDeck should contain the project cards that the user has made
// Accepts props with username
// Need to create Cards based on post fields (created in CreateProjectModal): 
// title, blurb, longer_description, url_link, collaborators

import React, { useState, useEffect } from "react"; //import React Component
import { Button } from "reactstrap";

export default function UserDeck(props) {
    const [val, setVal] = useState("");

    console.log(props.username)

    return (        
        <div>            
            <Button color="primary">Test</Button>
        </div>
    )
}