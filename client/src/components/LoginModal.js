import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { CredentialsContext } from "../App";
import { LoginService } from "../services/LoginService";

function LoginModal() {
  const { setCredentials } = useContext(CredentialsContext);

  const [show, setShow] = useState(false);

  const [loginRequest, setLoginRequest] = useState({
    username: '',
    password: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickSubmit = async () => {
    // Await login process
    LoginService.LogIn(loginRequest, setCredentials)
      .then((payload) => {
        // toast to user the success
        toast.info(payload);
      })
      .catch((err) => {
        toast.error(err + '');
        setCredentials();
      });
  }

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Log in
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>♠ Log into Your DevDeck Account ♠</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="login.form">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="ex: treblenaX"
                onChange={e => setLoginRequest((prev) => {
                  prev.username = e.target.value;
                  return prev;
                })}
                autoFocus
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setLoginRequest((prev) => {
                  prev.password = e.target.value;
                  return prev;
                })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClickSubmit}>
            Log in
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;