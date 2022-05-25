import React from "react"; //import React Component
import { Button } from "reactstrap";

export function Card() {
    return (
        <div className="card" style={{width: '18em', margin: '1rem'}}>
        <img className="card-img-top" src="..." alt="Project thumbnail"></img>
        <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Project description... lorem ipsum et cetera</p>
            <Button className="btn btn-primary" onClick={() => console.log("Link")}>
                Link to project?
            </Button>
        </div>
        </div>
    )
}