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

    return (
        <div>
            <Button color="secondary" onClick={toggle}>Edit</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create a new project</ModalHeader>
                {/* <ModalBody>
                    <Form onSubmit={props.handleSubmit}>
                        <label htmlFor="addBook">Add books you have below:</label>
                        <Input type="text" value={props.val} onChange={handleOnChange}
                            placeholder="Book Title...">
                        </Input>
                        <ul>
                            {listItems}
                        </ul>
                        <Button
                            className="add" color="secondary">Add to list</Button>
                    </Form>
                </ModalBody> */}
                <ModalFooter>
                    <Button color="primary" onClick={handleCancel}>Cancel</Button>
                    <Button color="danger" onClick={SaveChanges}>Save changes</Button>
                </ModalFooter>
            </Modal>
            {/* <Button className="clear" onClick={clear} color="primary">Clear</Button> */}
        </div>
    )
}

export default CreateProjectModal;