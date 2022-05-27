import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function SignupModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Sign Up
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up For a DevDeck Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="signup.form">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="ex: Elbert"
                  autoFocus
                />
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="ex: Cheng"
                />
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="ex: treblenaX"
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                />
                {/* @TODO: password validation */}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default SignupModal;