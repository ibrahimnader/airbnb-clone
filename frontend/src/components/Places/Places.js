import React, { Component } from 'react'
import { Container, Row, Spinner, Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Place from './Place'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Places extends Component {
    state = {
        places: [],
        loading: true,
        showModal: false
    }
    componentDidMount() {
        let searchParams;
        try {
            const search = this.props.location.search.slice(1);
            searchParams = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
        } catch (ex) {
            console.log("error with parsing search params")
            this.props.history.push('/')
        }
        axios.post(`http://localhost:8000/api/v1/places`, searchParams).then((res) => {
            this.setState({
                places: res.data.data,
                loading: false
            })
        }).catch((err) => {
            console.log("error with fetching places")
            console.log(searchParams)
            this.props.history.push('/')
        })
    }
    handleClose = () => this.setState({ showModal: false });
    handleShow = () => this.setState({ showModal: true });
    render() {
        return (
            <Container className='mb-3' id="Places">
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>


                {this.state.places.length > 0 ? <Row>{this.state.places.map((place, i) => (
                    <Place key={place._id} place={place} searchQuery={this.props.location.search} />
                ))}</Row> : this.state.loading ? null : <h2 className="text-center py-5">No Places Found</h2>}

                {
                    this.state.loading ? <div className="text-center py-5">
                        <Spinner animation="border" style={{ height: '3rem', width: '3rem' }} />
                    </div> : null
                }
            </Container >
        )
    }
}

export default withRouter(Places)