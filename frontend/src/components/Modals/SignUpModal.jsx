import React, {useState, useContext} from 'react'
import { Modal, Form, Alert } from 'react-bootstrap'
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';
import {toast} from 'react-toastify';

const SignUpModal = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Error Signing up');
    const {login} = useContext(AppContext);
    function handleSubmit(e){
        e.preventDefault();
        console.log(firstName, lastName, email, password);
        axios.post(`http://localhost:8000/api/v1/auth/register`, {firstName, lastName, email, password}).then((res) => {
            console.log('user signed up');
            console.log(res.data);
            login(res.data.token, res.data.user);
            toast('You have Signed up!', {type:'success'})
            props.onHide();
        }).catch((err) => {
            console.log('error');
            console.log(err.response.data);
            setErrorMessage(err.response.data.error.split(',').map(message => <p>{message}</p>));
            setWrongCredentials(true);
        })
    }
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} className="form-modal modal-signUp">
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {wrongCredentials ? <Alert variant="danger" className="text-center">{errorMessage}</Alert>: null}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} placeholder="Enter Your First Name"  onChange={(e) => setFirstName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} placeholder="Enter Your Last Name" onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>

                        <button type="submit" className="form-modal__btn-submit">
                            Sign Up
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SignUpModal
