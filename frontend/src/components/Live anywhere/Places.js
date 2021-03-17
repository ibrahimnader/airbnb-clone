import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import Place from './Place'

class Places extends Component {
    static defaultProps = {
        places: [
            { id: 'a0316ecb-e49b-4b3a-b6b6-c2876b820e8c', name: 'Entire homes' },
            { id: 'ff69ac49-64e7-4f4a-ae2b-ee01163d0790', name: 'Cabins and cottages' },
            { id: 'ce6814ba-ed53-4d6e-b8f8-c0bbcf821011', name: 'Unique stays' },
            { id: 'fbe849a4-841a-41b3-b770-419402a6316f', name: 'Pets welcome' }
        ]
    }
    render() {
        return (
            <div className="mb-5">
                <Container>
                    <h1>Live anywhere</h1>
                    <Row>
                        {this.props.places.map((p, id) => (
                            <Place key={id} id={p.id} name={p.name} />
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Places
