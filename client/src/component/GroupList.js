import React, { Component } from 'react'
import { ButtonGroup, Button, Container, Table } from 'reactstrap'
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavBar'

export default class GroupList extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: true, groups: [] }
        this.remove = this.remove.bind(this)
    }

    componentDidMount() {
        this.setState({ isLoading: true })

        fetch('/groups')
            .then(response => response.json())
            .then(data => this.setState({ groups: data, isLoading: false }))
    }

    async remove(id) {
        await fetch(`/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then(() => {
            var updateGroup = [...this.state.groups].filter(i => i.id !== id)
            this.setState({ groups: updateGroup })
        })
    }
    render() {
        const { isLoading, groups } = this.state

        if (isLoading) {
            return <p>Loading...</p>
        }

        const groupList = groups.map(group => {
            const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`

            return (
                <tr key={group.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        {group.name}
                    </td>
                    <td>
                        {address}
                    </td>
                    <td>
                        {group.events.map(event => {
                            return (
                                <div key={event.id}>
                                    {new Intl.DateTimeFormat(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: '2-digit'
                                        }
                                    ).format(new Date(event.date))} : {event.title}
                                </div>
                            )
                        })}
                    </td>
                    <td>
                        <ButtonGroup>
                            <Button className="mr-2" size="md" color="primary" tag={Link} to={"/group/" + group.id}>
                                Edit
                            </Button>
                            <Button size="md" color="danger" onClick={() => this.remove(group.id)}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/group/new">
                            Add Group
                        </Button>
                    </div>
                    <h3>
                        My JUG Tour
                    </h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                                <th width="20%">Location</th>
                                <th>Events</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}
