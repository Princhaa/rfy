import React, { Component } from 'react';
import { Header, Segment, Image, Item, Comment, Form, Button, Modal, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar';
import config from '../config/config';

const majalah = require('../assets/majalah.jpg');
const furirin = require('../assets/furirin.jpg');
const suwawa = require('../assets/suwawa.jpg');
const rikyako = require('../assets/rikyako.jpg');
const items = ['Item 1', 'Item 2', 'Item 3'];

class Post extends Component {

    state = {
        picture: majalah,
        price: '',
        description: '',
        title: '',
        sold: false,
        creator: {
            firstname: '',
            lastname: '',
            email: ''
        },
        messageModalOpened: false,
        sentMessage: false,
        loginMessage: false,
        comments: [],
        commentLoginMessage: false
    }

    componentWillMount() {
        this.getPostDetail();
        this.getComments();
    }

    getPostDetail() {
        console.log(this.props)
        fetch(config.SERVER_IP + '/api/post-detail', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                _id: this.props.postId
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let price;
                responseJson.price = responseJson.price / 1000;
                price = responseJson.price + '.000';
                this.setState({
                    price: price,
                    description: responseJson.description,
                    title: responseJson.title,
                    sold: responseJson.sold,
                    creator: responseJson._creator,
                    image: responseJson.image
                });
            })
    }

    getComments() {
        fetch(config.SERVER_IP + '/api/get-post-comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                _id: this.props.postId
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    comments: responseJson.map((comment, index) => {
                        return {
                            content: comment.content,
                            creator: comment._creator
                        }
                    })
                })
            })
    }

    sendMessage() {
        this.setState({ messageModalOpened: false });
        fetch(config.SERVER_IP + '/api/new-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                _receiver: this.state.creator._id,
                message: this.state.message
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == true) {
                    this.setState({ sentMessage: true })
                } else {
                    console.log(responseJson);
                }
            })
    }

    openMessageModal() {
        if (this.props.loginState == 'logged_in') {
            this.setState({ messageModalOpened: true })
        } else {
            this.setState({ loginMessage: true })
        }
    }

    renderComments() {
        let comments = this.state.comments;
        return comments.map((comment, index) => {
            return (
                <Comment>
                    <Comment.Avatar src={`${config.SERVER_IP}/static${comment.creator.picture}`} />
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.creator.firstname} {comment.creator.lastname}</Comment.Author>
                        <Comment.Text>{comment.content}</Comment.Text>
                    </Comment.Content>
                </Comment>
            )
        })
    }

    sendComment() {
        if (this.props.loginState == 'logged_in') {
            fetch(config.SERVER_IP + '/api/post-new-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                },
                body: JSON.stringify({
                    content: this.state.addComment,
                    _id: this.props.postId
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.getComments();
                })
        }
        else {
            this.setState({ commentLoginMessage: true });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <AppBar
                        menus={items}
                        history={this.props.history}
                    />
                </div>
                <div style={styles.container}>
                    <div style={styles.contentContainer}>
                        <div style={styles.title}>
                            <Header size='huge' dividing>{this.state.title}</Header>
                        </div>
                        <div style={styles.content}>
                            <div style={styles.left}>
                                <Segment attached>
                                    <Image src={`${config.SERVER_IP}/static${this.state.image}`} />
                                </Segment>
                                <Segment attached>
                                    <Header as='h3'>Posted by</Header>
                                    <div style={styles.profile}>
                                        <div style={styles.sellerPicture}>
                                            <Image src={`${config.SERVER_IP}/static${this.state.creator.picture}`} shape='circular' />
                                        </div>
                                        <div style={styles.sellerDetail}>
                                            <Header as='h4'>
                                                {this.state.creator.firstname + " " + this.state.creator.lastname}
                                            </Header>
                                            {this.state.creator.email}
                                        </div>
                                    </div>
                                </Segment>
                                <Segment attached='bottom'>
                                    <Button primary fluid onClick={() => this.openMessageModal()}>Contact seller</Button>
                                    <Modal open={this.state.messageModalOpened}>
                                        <Modal.Header>
                                            Message User
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Form>
                                                <Form.TextArea onChange={(e) => this.setState({ message: e.target.value })} />
                                            </Form>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='green' onClick={() => this.sendMessage()}>
                                                <Icon name='send' /> Send
                                            </Button>
                                            <Button color='red' onClick={() => this.setState({ messageModalOpened: false })}>
                                                <Icon name='ban' /> Cancel
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                    <Message success floating hidden={!this.state.sentMessage}>
                                        <Message.Header>Message sent</Message.Header>
                                        <p>Your message has been sent!</p>
                                    </Message>
                                    <Message negative floating hidden={!this.state.loginMessage}>
                                        <Message.Header>Not logged in</Message.Header>
                                        <p>You have to be logged in to send messages</p>
                                    </Message>
                                </Segment>
                            </div>
                            <div style={styles.right}>
                                <Segment>
                                    <Header dividing as='h1'>
                                        Rp. {this.state.price}
                                    </Header>
                                    <div style={styles.description}>
                                        Description: <br />
                                        {this.state.description}
                                    </div>
                                </Segment>
                                <div style={styles.comments}>
                                    <Comment.Group style={styles.commentGroup}>
                                        <Header as='h3' dividing>Comments</Header>
                                        {this.renderComments()}
                                        <Form>
                                            <Form.TextArea onChange={(e) => this.setState({ addComment: e.target.value })} />
                                        </Form>
                                        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => this.sendComment()} />
                                    </Comment.Group>
                                </div>
                                <Message negative floating hidden={!this.state.commentLoginMessage}>
                                    <Message.Header>Not logged in</Message.Header>
                                    <p>You have to be logged in to send comment</p>
                                </Message>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    contentContainer: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        maxWidth: '80%'
    },

    content: {
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        padding: 20
    },

    left: {
        flex: 3
    },

    right: {
        flex: 9,
        marginLeft: 20,
        width: '100%'
    },

    profile: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },

    sellerPicture: {
        flex: 1
    },

    sellerDetail: {
        flexDirection: 'column',
        display: 'flex',
        flex: 3,
        justifyContent: 'center',
        marginLeft: 20
    },

    description: {
        marginTop: 20
    },

    comments: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
    },

    commentGroup: {
        width: '100%'
    }
}

const mapStateToProps = (state) => {
    return {
        postId: state.postId,
        token: state.token,
        loginState: state.loginState
    }
}

export default connect(mapStateToProps)(Post);