import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import { fetchJSON } from '../utils/utils.js';
import { BASEPOINT } from "../App";

function CreateProjectModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let saveChanges = async () => { // based on postUrl() function from websharer (index.js)
        // saving changes to project (need to connect to server/db)
        let title = document.getElementById("titleInput").value;
        let blurb = document.getElementById("blurbInput").value;
        let longer_description = document.getElementById("longerDescrInput").value;
        let url_link = document.getElementById("urlInput").value;
        let tech_stack = document.getElementById("techStackInput").value;
        let collaborators = document.getElementById("collabInput").value;

        console.log(title, blurb, longer_description, url_link, collaborators);

        // try {
            await fetchJSON(BASEPOINT + '/api/posts', {
                method: "POST",
                body: { 
                    title: title,
                    blurb: blurb,
                    longer_description: longer_description,
                    url_link: url_link,
                    tech_stack: tech_stack,
                    collaborators: collaborators
                }
            })
        // } catch (error) {
        //     document.getElementById("postStatus").innerText = "Error"
        //     throw (error)
        // }

        // resetting DOM values
        document.getElementById("titleInput").value = "";
        document.getElementById("blurbInput").value = "";
        document.getElementById("longerDescrInput").value = "";
        document.getElementById("urlInput").value = "";
        document.getElementById("techStackInput").value = "";
        document.getElementById("collabInput").value = "";
        toggle();
    }

    let handleCancel = () => {
        toggle();
    }

    const handleSubmit = event => { // handle submission of modal form
        event.preventDefault()
        // if (props.val.length > 0) { //props
        //     props.setList((old) => [...old, props.val]); //props
        // }
        // props.setVal(''); //props
    }

    return (
        <div>
            <Button color="secondary" onClick={toggle}>Add project</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>♠ Add a new project card to your deck ♠</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="addInfo">Input your project information below:</label>
                        {/* <Input type="text" value={props.val} onChange={handleOnChange} */}
                        <Input type="text" id="titleInput"
                            placeholder="Project Title">
                        </Input>
                        <Input type="text" id="blurbInput"
                            placeholder="Blurb for your project">
                        </Input>
                        <Input type="text" id="longerDescrInput"
                            placeholder="Longer description of your project (inspiration, challenges, etc)">
                        </Input>
                        <Input type="text" id="urlInput"
                            placeholder="Link to your project">
                        </Input>
                        <Input type="text" id="techStackInput"
                            placeholder="Technologies you used to create your project">
                        </Input>
                        <Input type="text" id="collabInput"
                            placeholder="Project collaborators (enter as [collaborator1, collaborator2...])">
                                {/* TO EDIT: if users have a devdeck account, ask them to put in their username instead of full name */}
                        </Input>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCancel}>Cancel</Button>
                    <Button color="danger" onClick={saveChanges}>Save changes</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CreateProjectModal;
