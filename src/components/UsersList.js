import React, { Component } from 'react';
import { Header, Segment, Button, Table } from 'semantic-ui-react';

export default class UsersList extends Component {
    render() {
        const { style } = this.props;
        return (
            <div style={style}>
                <Header as='h2' attached='top'>
                    Users list
                </Header>
                <Segment attached>
                    <Table celled fixed selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Phone number</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Furihata Ai</Table.Cell>
                                <Table.Cell>furihataai32@gmail.com</Table.Cell>
                                <Table.Cell>+817739200492</Table.Cell>
                                <Table.Cell>
                                    <Button.Group fluid>
                                        <Button negative>Delete user</Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Aida Rikako</Table.Cell>
                                <Table.Cell>rikyako_aida17@gmail.com</Table.Cell>
                                <Table.Cell>+81332395923</Table.Cell>
                                <Table.Cell>
                                    <Button.Group fluid>
                                        <Button negative>Delete user</Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Suwa Nanaka</Table.Cell>
                                <Table.Cell>nanakasuwawa88@gmail.com</Table.Cell>
                                <Table.Cell>+814858384344</Table.Cell>
                                <Table.Cell>
                                    <Button.Group fluid>
                                        <Button negative>Delete users</Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        )
    }
}