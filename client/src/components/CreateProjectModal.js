import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';

function CreateProjectModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let saveChanges = async () => { // based on postUrl() function from websharer (index.js)
        // saving changes to project (need to connect to server/db)
        let title = document.getElementById("titleInput").value;
        let blurb = document.getElementById("blurbInput").value;
        let longer_description = document.getElementById("longerDescrInput").value;
        let url_link = document.getElementById("urlInput").value;
        let collaborators = document.getElementById("collabInput").value;
        // also need to identify & assign username (through session/login info)

        console.log(title, blurb, longer_description, url_link, collaborators);

        try {
            await fetchJSON('api/posts', { // ../server/routes/api/posts
                method: "POST",
                body: { 
                    title: title,
                    blurb: blurb,
                    longer_description: longer_description,
                    url_link: url_link,
                    collaborators: collaborators
                }
            })
        } catch (error) {
            document.getElementById("postStatus").innerText = "Error"
            throw (error)
        }

        // resetting DOM values
        document.getElementById("titleInput").value = "";
        document.getElementById("blurbInput").value = "";
        document.getElementById("longerDescrInput").value = "";
        document.getElementById("urlInput").value = "";
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
                        <Input type="text" value={props.val} id="titleInput"
                            placeholder="Project Title">
                        </Input>
                        <Input type="text" value={props.val} id="blurbInput"
                            placeholder="Blurb for your project">
                        </Input>
                        <Input type="text" value={props.val} id="longerDescrInput"
                            placeholder="Longer description of your project (inspiration, challenges, etc)">
                        </Input>
                        <Input type="text" value={props.val} id="urlInput"
                            placeholder="Link to your project">
                        </Input>
                        <Input type="text" value={props.val} id="collabInput"
                            placeholder="Project collaborators (enter as [collaborator1, collaborator2...])">
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

async function fetchJSON(route, options){
    let response
    try{
        response = await fetch(route, {
            method: options && options.method ? options.method : "GET",
            body: options && options.body ? JSON.stringify(options.body) : undefined,
            headers: options && options.body ? {'Content-Type': 'application/json'}: undefined
        })
    }catch(error){
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
             No response from server (failed to fetch)`)
    }
    let responseJson;
    // try{
        responseJson = await response.json();
    // }catch(error){
    //     let responseText;
    //     let getTextError;
    //     try{
    //         responseText = await response.text();
    //     }catch(getTextError){
    //         displayError()
    //         throw new Error(
    //             `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
    //             Status: ${response.status}
    //             Couldn't get response body
    //             error: ${getTextError}`)
    //     }
    //     displayError()
    //     throw new Error(
    //         `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
    //         Status: ${response.status}
    //         Response wasn't json: ${responseText ? JSON.stringify(responseText) : responseText}
    //         error: ${getTextError}`)
    // }
    // if(response.status < 200 || response.status >= 300 || responseJson.status == "error"){
    //     displayError()
    //     throw new Error(
    //         `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
    //         Status: ${response.status}
    //         Response: ${responseJson ? JSON.stringify(responseJson) : responseJson}`)
    // }
    return responseJson
}

async function displayError(){
    document.getElementById('errorInfo').innerText = 'Error: action failed (see console for more information)'
    document.getElementById('errorInfo').style.opacity = 1
    // pause 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4 * 1000))
    document.getElementById('errorInfo').innerText= ''
    document.getElementById('errorInfo').style.opacity = 0
}

export default CreateProjectModal;