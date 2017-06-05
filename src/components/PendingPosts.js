import React, { Component } from 'react';
import { Header, Segment, Button, Table } from 'semantic-ui-react';

import config from '../config/config';

export default class PendingPosts extends Component {

    state = {
        posts: []
    }

    componentWillMount(){
        this.getPost();
    }

    getPost() {
        return fetch(config.SERVER_IP + '/api/post-list', {
            method: 'GET'
        }).then((response) => response.json())
            .then((response) => {
                this.setState({
                    posts: response.map((posts, index) => {
                        return {
                            id: posts._id,
                            postTitle: posts.title,
                            price: posts.price,
                            creator: posts._creator.firstname + " " + posts._creator.lastname,
                        }
                    })
                })
            })



    }

    renderPost() {
        let posts = this.state.posts;
        return posts.map((posts, index) => {
            return (
                <Table.Row key = {index}>
                    <Table.Cell>{posts.postTitle}</Table.Cell>
                    <Table.Cell>Rp.{posts.price}</Table.Cell>
                    <Table.Cell>{posts.creator}</Table.Cell>
                    <Table.Cell>
                        <Button.Group fluid>
                            <Button positive>Approve</Button>
                            <Button negative>Reject</Button>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            )

        })
    }

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
                            {this.renderPost()}
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