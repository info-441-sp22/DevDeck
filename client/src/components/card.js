import React, { useState, useEffect } from "react"; //import React Component
import { Button } from "reactstrap";

export function Card(props) {
    const cardData = props.cardData
    const [val, setVal] = useState("");
    console.log("cardData", cardData)
    console.log(cardData.username)

    return (
        <div className="card bg-custom" style={{ width: '18em', margin: '1rem' }}>
            <img className="card-img-top" src="..." alt="Project thumbnail"></img>
            <div className="card-body">
                <h5 className="card-title">{cardData.title}</h5>
                <p className="card-text">{cardData.username}</p>
                <p className="card-text">{cardData.blurb}</p>
                <Button className="btn btn-primary" onClick={() => console.log("Link")}>
                    View project details
                </Button>
            </div>            
        </div>
    )
}