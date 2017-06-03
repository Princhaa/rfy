import React, { Component } from 'react';
import { Segment, Header, Input, Button, Divider, Modal, Form, Icon, Image, Dimmer, Loader, Message, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import config from '../config/config';
import AppBar from '../components/AppBar';
import '../App.css';
import store from '../service/store';
import { setLoginState, setToken } from '../service/action';

const majalah = require('../assets/majalah.jpg');
const furirin = require('../assets/furirin.jpg');
const items = ['Item 1', 'Item 2', 'Item 3'];
const logo = require('../assets/logo.png');

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        maxWidth: '80%'
    },

    left: {
        flex: 10,
        marginRight: 20,
    },

    logo: {
        marginBottom: 20,
        display: 'flex',
        width: '100%',
        flex: 1,
        justifyContent: 'center'
    },

    right: {
        flex: 3,
        marginLeft: 20
    }
}

class Home extends Component {

    state = {
        isRegistering: false,
        username: '',
        password: '',
        loginMessage: false,
        usernameMessage: false,
        firstname: '',
        lastname: '',
        email: '',
        confirmpassword: '',
        registerModalOpened: false,
        registrationStatusMessage: false
    }

    register() {
        console.log(this.state);
        fetch(config.SERVER_IP + '/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
            })
        }).then((response) => {
            if (response.status == 200) {
                this.setState({ registrationStatusMessage: true, registerModalOpened: false });
                return response.json();
            } else {
                console.log(response.status);
            }
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson.success == false) {
                alert('Register failed');
            }
        })
    }

    async login() {
        console.log(this.state)
        this.setState({ isRegistering: true });
        fetch(config.SERVER_IP + '/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((response) => {
                console.log(response.status);
                if (response.status == 200) return response.json();
            })
            .then((responseJson) => {
                if (responseJson != undefined) {
                    console.log(responseJson);
                    this.setState({ isRegistering: false });
                    store.dispatch(setLoginState('logged_in'));
                    console.log(responseJson.token);
                    store.dispatch(setToken(responseJson.token));
                    this.props.history.push('/profile');
                }
                else {
                    this.setState({ isRegistering: false, loginMessage: true });
                }
            }).catch(console.log)
    }

    usernameCheck() {
        console.log(this.state.username);
        fetch(config.SERVER_IP + '/api/check-username', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username
            })
        })
            .then((response) => {
                console.log(response)
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.status == 'unavailable') {
                    this.setState({ usernameMessage: true })
                } else {
                    this.setState({ usernameMessage: false })
                }
            })
    }

    closeModal() {
        this.setState({ registerModalOpened: false })
    }

    getHomeForm() {
        if (this.props.loginState == 'logged_in') {
            return (
                <Segment attached>
                    <Image src={furirin} size='medium' shape='circular' />
                    <Header as='h2'>Furihata Ai</Header>
                    <Button fluid primary>Edit profile</Button>
                </Segment>
            )
        } else {
            return (
                <Segment attached color='red'>
                    <Input icon='user' iconPosition='left' fluid placeholder='Username' onChange={(e) => this.setState({ username: e.target.value })} />
                    <br />
                    <Input icon='privacy' iconPosition='left' fluid placeholder='Password' type='password' onChange={(e) => this.setState({ password: e.target.value })} />
                    <br />
                    <Button primary fluid onClick={() => this.login()}>Login</Button>
                    <Message negative floating hidden={!this.state.loginMessage}>
                        <Message.Header>Login failed</Message.Header>
                        <p>Please check your username and password</p>
                    </Message>
                    <Divider horizontal>OR</Divider>
                    <Modal trigger={<Button secondary fluid onClick={() => this.setState({ registerModalOpened: true })}>Register</Button>} open={this.state.registerModalOpened}>
                        <Modal.Header>
                            Register
                        </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>First Name</label>
                                    <input placeholder='First name' onChange={(e) => this.setState({ firstname: e.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Last Name</label>
                                    <input placeholder='Last name' onChange={(e) => this.setState({ lastname: e.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Username' onChange={(e) => this.setState({ username: e.target.value })} onBlur={() => this.usernameCheck()} />
                                </Form.Field>
                                <Message negative floating hidden={!this.state.usernameMessage}>
                                    <Message.Header>Username taken</Message.Header>
                                    <p>That username is already taken!</p>
                                </Message>
                                <Form.Field>
                                    <label>Email</label>
                                    <input placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type='password' onChange={(e) => this.setState({ password: e.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Confirm password</label>
                                    <input placeholder='Confirm password' type='password' />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={() => this.register()}>
                                <Icon name='checkmark' /> Register
                            </Button>
                            <Button color='red' onClick={() => this.closeModal()}>
                                <Icon name='ban' /> Cancel
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <Message positive floating hidden={!this.state.registrationStatusMessage}>
                        <Message.Header>Register success!</Message.Header>
                        <p>Please login from form above</p>
                    </Message>
                </Segment>
            )
        }
    }

    getPosts() {
        return fetch(config.SERVER_IP + '/api/post-list', {
            method: 'GET'
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                return responseJson.map(function (post, index) {
                    console.log(post);
                    return (
                        <Card key={index}>
                            <Image src={majalah} />
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
            })
    }

    renderPost(posts) {

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
                    <Dimmer active={this.state.isRegistering}>
                        <Loader>Registering</Loader>
                    </Dimmer>
                    <div style={styles.content}>
                        <div style={styles.left}>
                            <div style={styles.logo}>
                                <div>
                                    <Image src={logo} />
                                </div>
                            </div>
                            <Input icon='search' fluid placeholder='Search' />
                            <Header dividing>
                                Featured Products
                            </Header>
                            <Segment>
                                <div>
                                    <Card>
                                        <Image src={majalah} />
                                        <Card.Content>
                                            <Card.Header>
                                                rfgrf
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className='date'>
                                                    Rp. fr
                                                </span>
                                            </Card.Meta>
                                            <Card.Description>
                                                fr
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                    {this.getPosts()}

                                </div>
                            </Segment>
                        </div>
                        <div style={styles.right}>
                            <Header as='h3' attached='top'>
                                {this.props.loginState == 'logged_in' ? 'Profile' : 'Login'}
                            </Header>
                            {this.getHomeForm()}
                            <Segment>
                                Lorem ipsum dolor sit amet
                            </Segment>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginState
    }
}

export default connect(mapStateToProps)(Home);