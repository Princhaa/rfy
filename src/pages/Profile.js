import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import { Segment, Header, Image, Button, Form, Card, Input, Item, Label, Modal, Icon, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FileInput from 'react-file-input';
import { connect } from 'react-redux';

import store from '../service/store';
import { setPostId, setUserPrivilege } from '../service/action';
import config from '../config/config';

const items = ['Item 1', 'Item 2', 'Item 3'];
const furirin = require('../assets/furirin.jpg');
const majalah = require('../assets/majalah.jpg');
const suwawa = require('../assets/suwawa.jpg');
const rikyako = require('../assets/rikyako.jpg');

var postPicture = new FormData();

class Profile extends Component {

    componentWillMount() {
        this.getProfileData();
        this.getPosts();
        this.getMessages();
    }

    getProfileData() {
        return fetch(config.SERVER_IP + '/api/my-profile', {
            method: 'GET',
            headers: {
                'Authorization': this.props.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    firstname: responseJson.firstname,
                    lastname: responseJson.lastname,
                    username: responseJson.username,
                    email: responseJson.email,
                    picture: responseJson.picture
                })
                store.dispatch(setUserPrivilege(responseJson.admin));
            })

    }

    state = {
        isProfileEditable: false,
        messageModalOpened: false,
        password: null,
        picture: null,
        profilePictureModal: false,
        newPostModal: false,
        postUploaded: false,
        myPosts: [],
        messages: [],
        sentMessage: false,
    }

    goToPost() {
        store.dispatch(setPostId('592cd7ac068496300dcfe3e5'));
        this.props.history.push('/post');
    }

    handleChange = (event) => {
        console.log('File: ', event.target.files[0]);
        let picture = new FormData();
        picture.append('avatar', event.target.files[0]);

        fetch(config.SERVER_IP + '/api/change-profile-picture', {
            method: 'POST',
            headers: {
                'Authorization': this.props.token
            },
            body: picture
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ picture: responseJson.picture })
            })
    }

    postPicturePicked = (event) => {
        console.log('File: ', event.target.files[0]);
        postPicture.append('picture', event.target.files[0]);
    }

    newPost() {
        this.setState({ newPostModal: false });
        fetch(config.SERVER_IP + '/api/new-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                title: this.state.postTitle,
                description: this.state.postDescription,
                category: this.state.postCategory,
                price: this.state.postPrice
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == true) {
                    let send = new FormData();
                    send.append('postId', responseJson.postId);
                    send.append('picture', postPicture.get('picture'));
                    fetch(config.SERVER_IP + '/api/post-picture', {
                        method: 'POST',
                        headers: {
                            'Authorization': this.props.token
                        },
                        body: send
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.success == true) {
                                this.setState({ postUploaded: true })
                            }
                        })
                }
            })
    }

    saveChanges() {
        this.setState({ isProfileEditable: !this.state.isProfileEditable });
        console.log(this.props.token);
        fetch(config.SERVER_IP + '/api/update-profile', {
            method: 'POST',
            headers: {
                'Authorization': this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
    }

    getPosts() {
        fetch(config.SERVER_IP + '/api/my-post', {
            method: 'GET',
            headers: {
                'Authorization': this.props.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ myPosts: responseJson })
            })
    }

    gotoPost(id) {
        store.dispatch(setPostId(id));
        this.props.history.push('/post');
    }

    getMessages() {
        fetch(config.SERVER_IP + '/api/get-messages', {
            method: 'GET',
            headers: {
                'Authorization': this.props.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    messages: responseJson.map((message, index) => {
                        return {
                            sender: message._sender,
                            message: message.message
                        }
                    })
                })
            })
    }

    renderPosts() {
        let posts = this.state.myPosts;
        return posts.map((post, index) => {
            return (
                <Card onClick={() => this.gotoPost(post._id)}>
                    <Image src={`${config.SERVER_IP}/static${post.image}`} />
                    <Card.Content>
                        <Card.Header>
                            {post.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                Rp. {post.price}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {post.description}
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        })
    }

    renderProfilePicture() {
        console.log(this.state.picture);
        if (this.state.picture == '/nopicture.gif') {
            return (
                <Image src={`${config.SERVER_IP}/static/nopicture.gif?` + new Date().getTime()} size='medium' shape='circular' />
            )
        }
        return (
            <Image src={`${config.SERVER_IP}/static${this.state.picture}?` + new Date().getTime()} size='medium' shape='circular' />
        )
    }

    renderMessages() {
        let messages = this.state.messages;
        return messages.map((message, index) => {
            return (
                <Item>
                    <Item.Image size='tiny' src={`${config.SERVER_IP}/static${message.sender.picture}?`} shape='circular' />
                    <Item.Content>
                        <Item.Header>{message.sender.firstname} {message.sender.lastname}</Item.Header>
                        <Item.Description>
                            {message.message} <br />
                            <Button  floated = 'right' icon = 'send' onClick = {() => this.setState({ messageModalOpened: true })}/>
                        </Item.Description>
                    </Item.Content>
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
                            <Button color='green' onClick={() => this.sendMessage(message.sender._id)}>
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
                </Item>
            )
        })
    }

    sendMessage(receiverId){
        fetch(config.SERVER_IP+'/api/new-message', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : this.props.token
            },
            body: JSON.stringify({
                _receiver: receiverId,
                message: this.state.message
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success == true) {
                this.setState({ sentMessage: true, messageModalOpened: false })
            } else {
                console.log(responseJson);
            }
        })
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
                            <Header size='huge' dividing>Profile</Header>
                            Edit your profile
                        </div>
                        <div style={styles.content}>
                            <div style={styles.left}>
                                <Segment attached>
                                    {this.renderProfilePicture()}
                                    <Header as='h2'>{this.state.lastname}</Header>
                                    {this.state.firstname}
                                </Segment>
                                <Segment attached='bottom'>
                                    <Button primary fluid onClick={() => this.setState({ profilePictureModal: true })}>Change profile picture</Button>
                                    <Modal open={this.state.profilePictureModal}>
                                        <Modal.Header>
                                            Change profile picture
                                        </Modal.Header>
                                        <Modal.Content>
                                            <FileInput name="myImage"
                                                accept=".png,.jpg"
                                                placeholder="My Image"
                                                className="inputClass"
                                                onChange={this.handleChange} >
                                                <Button>Pick profile picture</Button>
                                            </FileInput>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='green' onClick={() => this.setState({ profilePictureModal: false })}>
                                                <Icon name='checkmark' /> Upload
                                            </Button>
                                            <Button color='red'>
                                                <Icon name='ban' /> Cancel
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                </Segment>
                                <Header as='h4' attached='top'>
                                    Latest Messages
                                </Header>
                                <Segment attached>
                                    <Item.Group divided>
                                        {this.renderMessages()}
                                    </Item.Group>
                                </Segment>

                            </div>
                            <div style={styles.right}>
                                <Header as='h2' attached='top'>Personal data</Header>
                                <Segment attached clearing>
                                    <Form>
                                        <Form.Field>
                                            <label>First Name</label>
                                            <input placeholder='First Name' value={this.state.firstname} disabled={!this.state.isProfileEditable} onChange={(e) => this.setState({ firstname: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Last Name</label>
                                            <input placeholder='Last Name' value={this.state.lastname} disabled={!this.state.isProfileEditable} onChange={(e) => this.setState({ lastname: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Username</label>
                                            <input placeholder='Username' value={this.state.username} disabled={!this.state.isProfileEditable} onChange={(e) => this.setState({ username: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Password</label>
                                            <input placeholder='New password' type='password' disabled={!this.state.isProfileEditable} onChange={(e) => this.setState({ password: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Email</label>
                                            <input placeholder='Email' type='email' value={this.state.email} disabled={!this.state.isProfileEditable} onChange={(e) => this.setState({ email: e.target.value })} />
                                        </Form.Field>

                                    </Form>
                                    <div style={styles.buttonContainer}>
                                        {(this.state.isProfileEditable) ?
                                            <div>
                                                <Button negative floated='right' onClick={() => this.setState({ isProfileEditable: !this.state.isProfileEditable })}>Cancel</Button>
                                                <Button positive floated='right' onClick={() => this.saveChanges()}>Save changes</Button>
                                            </div>
                                            :
                                            <Button primary floated='right' onClick={() => this.setState({ isProfileEditable: !this.state.isProfileEditable })}>Edit profile</Button>}
                                    </div>
                                </Segment>
                                <Message
                                    success
                                    header='Post saved'
                                    content='Your post has been successfully uploaded. Please wait for it to be approved'
                                    hidden={!this.state.postUploaded}
                                />
                                <Header as='h2' attached='top'>Post List</Header>
                                <Segment attached clearing>
                                    <Button primary floated='right' onClick={() => this.setState({ newPostModal: true })}>
                                        New post
                                    </Button>
                                    <Modal open={this.state.newPostModal}>
                                        <Modal.Header>
                                            New Post
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Form>
                                                <Form.Field>
                                                    <label>Post title</label>
                                                    <input placeholder='Title' onChange={(e) => this.setState({ postTitle: e.target.value })} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Category</label>
                                                    <input placeholder='Category' onChange={(e) => this.setState({ postCategory: e.target.value })} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Price</label>
                                                    <Input label='Rp. ' placeholder='Price' onChange={(e) => this.setState({ postPrice: e.target.value })} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Description</label>
                                                    <Form.TextArea onChange={(e) => this.setState({ postDescription: e.target.value })} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Post picture</label>
                                                    <input label='Pick picture' type='file' onChange={this.postPicturePicked} />
                                                </Form.Field>
                                            </Form>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='green' onClick={() => this.newPost()}>
                                                <Icon name='send' /> Post
                                            </Button>
                                            <Button color='red' onClick={() => this.setState({ newPostModal: false })}>
                                                <Icon name='ban' /> Cancel
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                    <div style={{ marginBottom: 20 }}>
                                        <Input icon='search' fluid placeholder='Search' />
                                    </div>
                                    <div>
                                        <Card.Group>
                                            {this.renderPosts()}
                                        </Card.Group>
                                    </div>
                                </Segment>
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

    buttonContainer: {
        marginTop: 20
    },

    contentContainer: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        maxWidth: '80%'
    },

    title: {
        flex: 1,
        marginBottom: 20,
        paddingLeft: 10
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

    card: {
        cursor: 'pointer'
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Profile);