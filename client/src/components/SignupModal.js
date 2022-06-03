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
    first_name: Yup.string()
      .required('First name is required.'),
    last_name: Yup.string()
      .required('Last name is required.'),
    username: Yup.string()
      .required('Username is required.'),
    email: Yup.string()
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(3, 'Password must be at 3 char long'),
    confirmPwd: Yup.string()
      .required('Password confirmation is required.')
      .oneOf([Yup.ref('password')], 'Passwords does not match.'),
  }).required();
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(formSchema)
  })
  const { errors } = formState

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickSubmit = async (data) => {
    LoginService.SignUp(data, setLoggedInCallback)
      .then((payload) => {
        // toast to user the success
        setToastMessageCallback('' + payload);
        setToastStateCallback('info');
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setToastMessageCallback('' + error);
        setToastStateCallback('error');
      });
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Sign up
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
                type="text"
                placeholder="ex: Glorious"
                {...register('first_name')}
                autoFocus
                className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Unicorn"
                {...register('last_name')}
                className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
              />
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: glorious_unicorn"
                {...register('username')}
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ex: gloriousunicorn@uw.edu"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
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
              <Button variant="danger" type="submit">
                Sign up
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