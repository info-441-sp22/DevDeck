import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import { fetchJSON } from '../utils/utils.js';
import { BASEPOINT } from "../App";
import { ImageService } from "../services/ImageService.js";
import { toast } from 'react-toastify';

function CreateProjectModal(props) {
    const setLoadingCallback = props.setLoadingCallback;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const uploadImageHandler = async (event) => {
        const request = new FormData();
        request.append('file', event.target.files[0]);
        await ImageService.uploadProjectImage(request);
        toast.info('Project image uploaded.');
        setLoadingCallback(true);
    }

    const onClickImageSubmitHandler = async () => {
        document.getElementById('project_img_upload').click();
    }

    let saveChanges = async () => { // based on postUrl() function from websharer (index.js)
        // saving changes to project (need to connect to server/db)
        let title = document.getElementById("titleInput").value;
        let blurb = document.getElementById("blurbInput").value;
        let longer_description = document.getElementById("longerDescrInput").value;
        let url_link = document.getElementById("urlInput").value;
        let tech_stack = document.getElementById("techStackInput").value;
        console.log("Tech stack", tech_stack)

        let collaborators = document.getElementById("collabInput").value;

        await fetchJSON(BASEPOINT + '/api/posts', {
            method: "POST",
            credentials: "include",
            body: {
                title: title,
                blurb: blurb,
                longer_description: longer_description,
                url_link: url_link,
                tech_stack: tech_stack,
                collaborators: collaborators
            }
        })

        // resetting DOM values
        document.getElementById("titleInput").value = "";
        document.getElementById("blurbInput").value = "";
        document.getElementById("longerDescrInput").value = "";
        document.getElementById("urlInput").value = "";
        document.getElementById("techStackInput").value = "";
        document.getElementById("collabInput").value = "";
        toggle();

        // Set loading to true
        setLoadingCallback(true);
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
                            placeholder="Technologies used to create your project (enter as [a, b...])">
                        </Input>
                        <Input type="text" id="collabInput"
                            placeholder="Project collaborators (enter as [a, b...])">
                            {/* TO EDIT: if users have a devdeck account, ask them to put in their username instead of full name */}
                        </Input>
                        <div>
                            {
                                <div>
                                    <input
                                        type="file"
                                        id="project_img_upload"
                                        name="project_img"
                                        accept="image/*"
                                        onChange={uploadImageHandler}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => onClickImageSubmitHandler()}>
                                        Change Image
                                    </Button>
                                </div>
                            }
                        </div>
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
