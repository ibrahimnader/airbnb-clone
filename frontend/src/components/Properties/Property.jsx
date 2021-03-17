import React from 'react'
import Confirmmodal from './Modal';
import { Button } from 'react-bootstrap';

import {useHistory} from 'react-router-dom';



export default function Property(props) {
    const history = useHistory();

    const handleEditProperty = () => {
        //  this.props.onEdit(this.props.data);
        console.log(props.data);
        history.push('/host', {edit: true, data: {...props.data}});
    }
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <React.Fragment>
            <tr>
                <td className="align-middle" style={{ width: '100px' }}><img src={`http://localhost:8000/uploads/${props.data.images[0]}`} style={{ height: '100px' }} />{props.data.type}</td>
                <td className="align-middle">{props.data.approved? 'yes':'no'}</td>
                <td className="align-middle">{props.data.bedrooms}</td>
                <td className="align-middle">{props.data.beds}</td>
                <td className="align-middle">{props.data.bathrooms}</td>
                <td className="align-middle">{props.data.location.city}</td>
                {/* <td className="align-middle"><button className="btn btn-danger" onClick={() => { this.props.onDelete(this.props.data) }}>Delete</button></td> */}
                <td className="align-middle">
                    <Button variant="primary" onClick={() => setModalShow(true)} className="btn btn-danger">
                        Delete
                    </Button>
                </td>
                <Confirmmodal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onDelete={() => { props.onDelete(props.data); setModalShow(false) }}
                />
                <td className="align-middle"><button className="btn btn-secondary" onClick={handleEditProperty}>Edit</button></td>
            </tr>
        </React.Fragment>
    )

}
