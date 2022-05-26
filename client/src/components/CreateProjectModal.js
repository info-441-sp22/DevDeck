import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';

function CreateProjectModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let SaveChanges = () => {
        // add code to save changes to project
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
                <ModalHeader toggle={toggle}>Add a new project</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="addInfo">Input your project information below:</label>
                        {/* <Input type="text" value={props.val} onChange={handleOnChange} */}
                        <Input type="text" value={props.val}
                            placeholder="Project Title...">
                        </Input>     
                        <Input type="text" value={props.val}
                            placeholder="Blurb for your project...">
                        </Input>                            
                        <Input type="text" value={props.val}
                            placeholder="Your inspiration for the project...">
                        </Input>  
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCancel}>Cancel</Button>
                    <Button color="danger" onClick={SaveChanges}>Save changes</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CreateProjectModal;