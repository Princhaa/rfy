import React, { Component } from 'react';
import { Header, Segment, Button, Table } from 'semantic-ui-react';

import config from '../config/config';

export default class UsersList extends Component {

    state = {
        users: []
    }

    componentWillMount(){
        this.getUsers();
    }

    async getUsers() {
        await fetch(config.SERVER_IP + '/api/users', {
            method: 'GET'
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    users: responseJson.map((users, index) => {
                        return {
                            id: users._id,
                            username: users.username,
                            email: users.email,
                            name: users.firstname + ' ' + users.lastname
                        }
                    })
                })
            })
    }

    renderUsers() {
        let users = this.state.users;
        return users.map((users, index) => {
            return (
                <Table.Row key = {index}>
                    <Table.Cell>{users.username}</Table.Cell>
                    <Table.Cell>{users.email}</Table.Cell>
                    <Table.Cell>{users.name}</Table.Cell>
                    <Table.Cell>
                        <Button.Group fluid>
                            <Button negative>Delete user</Button>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    render() {
        const { style } = this.props;
        console.log(this.state);
        return (
            <div style={style}>
                <Header as='h2' attached='top'>
                    Users list
                </Header>
                <Segment attached>
                    <Table celled fixed selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Username</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.renderUsers()}
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        )
    }
}