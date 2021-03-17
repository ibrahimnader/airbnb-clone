import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import City from './City'

class Cities extends Component {
    static defaultProps = {
        cities: [
            {
                id: 'be4d3ba5-08d7-4afe-95a7-f2da6453886a',
                name: 'Harghada',
                duration: '7-hour drive'
            },
            { id: '7253e011-7c22-48fd-b75d-d0da35372397', name: 'Giza', duration: '2-hour drive' },
            {
                id: '52e8083e-2de2-446d-a860-534eab250541',
                name: 'New Cairo City',
                duration: '2.5-hour drive'
            },
            {
                id: '20e74de0-0eb8-4fca-afb8-b111875acdf5',
                name: 'Dahab',
                duration: '7.5-hour drive'
            },
            {
                id: 'e639b7ab-aee3-48ee-9743-216684a51319',
                name: 'Sharm El-Sheikh',
                duration: '7.5-hour drive'
            },
            {
                id: 'ca3737ef-0faf-46ba-b055-b4a2d99e2cea',
                name: '6th of October City',
                duration: '2.5-hour drive'
            },
            {
                id: '585d1e53-e2e1-4baf-a34e-36301dd1e2da',
                name: 'Madinaty',
                duration: '2.5-hour drive'
            },
            { id: '7c309a70-bc93-4603-8d3b-9d4cd9bf75b2', name: 'Marina', duration: '4-Hour drive' }
        ]
    }
    render() {
        return (
            <div className="py-5">
                <Container>
                    <Row>
                        {this.props.cities.map((c, id) => (
                            <City key={id} id={c.id} name={c.name} duration={c.duration} />
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Cities
