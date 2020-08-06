import React, { Component } from 'react'
import '../App.css'
import AppNavbar from './AppNavBar'
import { Link } from 'react-router-dom'
import { Container, Button } from 'reactstrap'

export default class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <Button color="primary" tag={Link} to='/groups'>
                        Manage Jug tours
                    </Button>
                </Container>
            </div>
        )
    }
}
