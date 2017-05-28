import React, { Component } from 'react';
import { Header, Segment, Button, Table } from 'semantic-ui-react';

export default class PendingPosts extends Component {
    render() {
        const { style } = this.props;
        return (
            <div style={style}>
                <Header as='h2' attached='top'>
                    Pending posts
                </Header>
                <Segment attached>
                    <Table celled fixed selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Post title</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>User</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Young Weekly Jump</Table.Cell>
                                <Table.Cell>Rp. 200.000.00,-</Table.Cell>
                                <Table.Cell>Furihata Ai</Table.Cell>
                                <Table.Cell>
                                    <Button.Group fluid>
                                        <Button positive>Approve</Button>
                                        <Button negative>Reject</Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Young Weekly Jump Gold</Table.Cell>
                                <Table.Cell>Rp. 500.000.00,-</Table.Cell>
                                <Table.Cell>Furihata Ai</Table.Cell>
                                <Table.Cell>
                                    <Button.Group fluid>
                                        <Button positive>Approve</Button>
                                        <Button negative>Reject</Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Nesoberi Dolls</Table.Cell>
                                <Table.Cell>Rp. 200.000.00,-</Table.Cell>
                                <Table.Cell>Aida Rikako</Table.Cell>
                                <Table.Cell>
                                    <Button.Group fluid>
                                        <Button positive>Approve</Button>
                                        <Button negative>Reject</Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Button floated='right' negative>
                                        Reject all
                                                    </Button>
                                    <Button floated='right' primary>
                                        Approve all
                                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>
            </div>
        )
    }
}