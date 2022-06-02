import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { LoginService } from "../services/LoginService";

function LoginModal(props) {
  const setLoggedInCallback = props.setLoggedInCallback;
  const setToastMessageCallback = props.setToastMessageCallback;
  const setToastStateCallback = props.setToastStateCallback;

  const [show, setShow] = useState(false);

  const [loginRequest, setLoginRequest] = useState({
    username: '',
    password: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickSubmit = async () => {
    // Await login process
    LoginService.LogIn(loginRequest, setLoggedInCallback)
      .then((payload) => {
        // toast to user the success
        setToastMessageCallback('' + payload);
        setToastStateCallback('info');
      })
      .catch((error) => {
        console.log(error);
        setToastMessageCallback('' + error);
        setToastStateCallback('error');
        setLoggedInCallback(false);
      });
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Log in
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log into Your DevDeck Account</Modal.Title>
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
          <Button variant="primary" onClick={onClickSubmit}>
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