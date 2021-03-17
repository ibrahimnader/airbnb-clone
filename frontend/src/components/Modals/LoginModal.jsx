import React , {useState, useContext} from 'react'
import './Modals.scss';
import { Modal, Form, Alert } from 'react-bootstrap'
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';
import {toast} from 'react-toastify';

const LoginModal = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const {login} = useContext(AppContext);
    function handleSubmit(e){
        e.preventDefault();
        console.log(email, password);
        axios.post(`http://localhost:8000/api/v1/auth/login`, {email, password}).then((res) => {
            console.log('place loaded');
            console.log(res.data);
            login(res.data.token, res.data.user);
            toast('You have logged in!', {type:'success'})
            props.onHide();
        }).catch((err) => {
            console.log('error');
            console.log(err.response);
            setWrongCredentials(true);
        })
    }
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} className="form-modal modal-login">
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {wrongCredentials ? <Alert variant="danger" className="text-center">Wrong Credentials</Alert>: null}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group> */}
                        <button  type="submit" className="form-modal__btn-submit">
                            Login
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal
