import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Button, Form, Modal } from "react-bootstrap";
import { LoginService } from "../services/LoginService";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function SignupModal(props) {
  const setLoggedInCallback = props.setLoggedInCallback;
  const setToastMessageCallback = props.setToastMessageCallback;
  const setToastStateCallback = props.setToastStateCallback;
  const formSchema = Yup.object().shape({
    first_name: Yup.string(),
    last_name: Yup.string(),
    username: Yup.string(),
    password: Yup.string()
      .required('Password is required.')
      .min(3, 'Password must be at 3 char long'),
    confirmPwd: Yup.string()
      .required('Password is required.')
      .oneOf([Yup.ref('password')], 'Passwords does not match.'),
  });
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  const [show, setShow] = useState(false);
  const [signupRequest, setSignupRequest] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickSubmit = async (data) => {
    LoginService.SignUp(data)
      .then((payload) => {
        // toast to user the success
        setToastMessageCallback('' + payload);
        setToastStateCallback('info');
        setLoggedInCallback(true);
      })
      .catch((error) => {
        console.log(error);
        setToastMessageCallback('' + error);
        setToastStateCallback('error');
        setLoggedInCallback(false);
      });
  }

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
          <Form onSubmit={handleSubmit(onClickSubmit)}>
            <Form.Group className="mb-3" controlId="signup.form">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstname"
                placeholder="ex: Glorious"
                onChange={e => setSignupRequest((prev) => {
                  prev.first_name = e.target.value;
                  return prev;
                })}
                {...register('first_name')}
                autoFocus
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="ex: Unicorn"
                onChange={e => setSignupRequest((prev) => {
                  prev.last_name = e.target.value;
                  return prev;
                })}
                {...register('last_name')}
              />
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="ex: glorious_unicorn"
                onChange={e => setSignupRequest((prev) => {
                  prev.username = e.target.value;
                  return prev;
                })}
                {...register('username')}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ex: gloriousunicorn@uw.edu"
                onChange={e => setSignupRequest((prev) => {
                  prev.email = e.target.value;
                  return prev;
                })}
                {...register('email')}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setSignupRequest((prev) => {
                  prev.password = e.target.value;
                  return prev;
                })}
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...register('confirmPwd')}
                className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignupModal;