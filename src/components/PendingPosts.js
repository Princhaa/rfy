import React, { Component } from 'react';
import { Header, Segment, Button, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import config from '../config/config';

class PendingPosts extends Component {

    state = {
        posts: []
    }

    componentWillMount(){
        this.getPost();
    }

    getPost() {
        return fetch(config.SERVER_IP + '/api/approved-post-list', {
            method: 'GET',
            headers: {
                'Authorization' : this.props.token
            }
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

    approvePost(postId){
        fetch(config.SERVER_IP+'/api/approve-post', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : this.props.token
            },
            body: JSON.stringify({
                postId: postId
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success == true) {
                this.getPost()
            } else {
                console.log(responseJson)
            }
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
                            <Button positive onClick = {() => this.approvePost(posts.id)}>Approve</Button>
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
                    </Table>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        token: state.token
    }    
}

export default connect(mapStateToProps)(PendingPosts);