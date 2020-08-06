import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavbarBrand, NavbarToggler, Collapse, NavItem, Nav, Navbar } from 'reactstrap'


export default class AppNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = { isOpen: false }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    Home
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=Ryv0-Cewu2g&list=PL70j_Yxy3GXPZSWFKurz_WWuSjC63kP4f&index=141" >
                                She - Selina & Sirinya [ Covered by Warin ]
                            </a>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}
