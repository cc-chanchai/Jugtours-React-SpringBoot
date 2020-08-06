import React, { Component } from 'react'
import AppNavbar from './AppNavBar'
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class GroupEdit extends Component {
    emptyItem = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const group = await (await fetch(`/group/${this.props.match.params.id}`)).json()
            this.setState({ item: group })
        }
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        var item = { ...this.state.item }
        item[name] = value
        this.setState({ item })
    }

    async handleSubmit() {
        const {item} = this.state;
        if(item.id){
            await fetch('/group/' + item.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        }else{
            await fetch('/group', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        }
    }
    render() {
        const { item } = this.state
        const title = <h2>{item.id ? 'Edit Group' : 'Add Group'}</h2>
        return (
            <div>
                <AppNavbar />
                <Container>
                    { title }
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={item.name || ''} 
                                onChange={this.handleChange} autoComplete="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" id="address" value={item.address || ''}
                                onChange={this.handleChange} autoComplete="address-level1" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="text" name="city" id="city" value={item.city || ''}
                                onChange={this.handleChange} autoComplete="address-level1" />
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="stateOrProvaince">State/Province</Label>
                                <Input type="text" name="stateOrProvince" id="stateOrProvince" value={item.stateOrProvince}
                                    onChange={this.handleChange} autoComplete="address-level1" />
                            </FormGroup>
                            <FormGroup className="col-md-5 mb-3">
                                <Label for="country">Country</Label>
                                <Input type="text" name="country" id="country" value={item.country || ''}
                                    onChange={this.handleChange} autoComplete="address-level1" />
                            </FormGroup>
                            <FormGroup className="col-md-3 mb-3">
                                <Label for="coutry">Postal Code</Label>
                                <Input type="text" name="postalCode" id="postalCode" value={item.postalCode}
                                    onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Button className="mr-5" color="primary" type="submit">Save</Button>
                            <Button className="mr-5" color="secondary" tag={Link} to="/groups">Cancle</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default GroupEdit